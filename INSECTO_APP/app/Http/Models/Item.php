<?php

namespace App\Http\Models;

use App\Exports\ItemsExport;
use App\Imports\ItemsImport;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Contracts\Auditable;
use QrCode;
use ZanySoft\Zip\Zip;

class Item extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['item_code', 'item_name', 'room_id', 'type_id', 'group', 'brand_id', 'serial_number', 'model', 'note', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'item_id';

    /**
     * {@inheritdoc}
     */
    public function transformAudit(array $data): array
    {
        if (Arr::has($data['old_values'], 'cancel_flag') and Arr::has($data['new_values'], 'cancel_flag')) {
            if ($data['old_values']['cancel_flag'] == 'N' and $data['new_values']['cancel_flag'] == 'Y') {
                $data['event'] = 'deleted';
            } elseif ($data['old_values']['cancel_flag'] == 'Y' and $data['new_values']['cancel_flag'] == 'N') {
                $data['event'] = 'restored';
            }
        }

        return $data;
    }

    public function room()
    {
        return $this->belongsTo('App\Http\Models\Room', 'room_id');
    }

    public function brand()
    {
        return $this->belongsTo('App\Http\Models\Brand', 'brand_id');
    }

    public function item_type()
    {
        return $this->belongsTo('App\Http\Models\Item_Type', 'type_id');
    }

    public function notification_problems()
    {
        return $this->hasMany('App\Http\Models\Notification_Problem', 'item_id', 'item_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function countItems()
    {
        return $this->getALL()->count();
    }

    public function findByCancelFlag($string)
    {
        return Item::with('room.building', 'item_type', 'brand', 'user')->where('cancel_flag', $string)->get();
    }

    public function findByCode($code)
    {
        return Item::where([
            ['item_code', $code],
            ['cancel_flag', 'N'],
        ])->with('room')->first();
    }

    public function findByID($int)
    {
        return Item::where('item_id', $int)->first();
    }

    public function getItemsCode()
    {
        $items = $this->findByCancelFlag('N');
        return $items->pluck('item_code');
    }

    public function getItemsGroupByTypeName($items)
    {
        return $items->filter(function ($item) {
            return $item->group == 'Y';
        })
            ->groupBy(function ($item) {
                return $item->item_type->type_name;
            })
            ->sortKeys();
    }

    public function getALL()
    {
        return Item::all();
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function setCode($code)
    {
        $this->item_code = $code;
    }

    public function setItemName($item_name)
    {
        $this->item_name = $item_name;
    }

    public function setRoomID($room_id)
    {
        $this->room_id = $room_id;
    }

    public function setTypeID($type_id)
    {
        $this->type_id = $type_id;
    }

    public function setBrandID($brand_id)
    {
        $this->brand_id = $brand_id;
    }

    public function setSerial($serial_number)
    {
        $this->serial_number = $serial_number;
    }

    public function setModel($model)
    {
        $this->model = $model;
    }

    public function createNewItem($item_code, $item_name, $room_id, $type_id, $group, $brand_id, $serial_number, $model, $note, $user_id)
    {
        $item = Item::firstOrCreate(
            ['item_code' => $item_code],
            [
                'item_name' => $item_name,
                'room_id' => $room_id,
                'type_id' => $type_id,
                'group' => $group,
                'brand_id' => $brand_id,
                'serial_number' => $serial_number,
                'model' => $model,
                'note' => $note,
                'cancel_flag' => 'N',
                'user_id' => $user_id,
            ]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$item->wasRecentlyCreated) {
            if ($item->cancel_flag == "Y") {
                $item->item_name = $item_name;
                $item->room_id = $room_id;
                $item->type_id = $type_id;
                $item->group = $group;
                $item->brand_id = $brand_id;
                $item->serial_number = $serial_number;
                $item->model = $model;
                $item->note = $note;
                $item->cancel_flag = "N";
                $item->user_id = $user_id;
                $item->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateItem($id, $item_name, $room_id, $type_id, $group,  $brand_id, $serial_number, $model, $note, $user_id)
    {
        // $findName = Item::where('item_name', $item_name)->first();
        // if(is_null($findName) || $findName->item_id = $id) {
        $item = $this->findByID($id);
        $item->item_name = $item_name;
        $item->room_id = $room_id;
        $item->type_id = $type_id;
        $item->group = $group;
        $item->brand_id = $brand_id;
        $item->serial_number = $serial_number;
        $item->model = $model;
        $item->note = $note;
        $item->user_id = $user_id;
        $item->save();
        return false;
        // }
        // return true;
    }

    public function setNullInItem($brand, $user_id)
    {
        // * change brand in items
        $items = $brand->items;
        foreach ($brand->items as $item) {
            $item->brand_id = null;
            $item->user_id = $user_id;
            $item->save();
        }
        return $items;
    }

    public function deleteItem($item_id, $user_id)
    {
        $item = $this->findByID($item_id);
        $item->setCancelFlag('Y');
        $item->user_id = $user_id;
        $item->save();
        return $item;
    }

    public function deleteItems($model, $data, $user_id)
    {
        $collection = new Collection();
        switch ($model) {
            case 'room':
                $room = $data;
                $items = $room->items;
                foreach ($items as $item) {
                    $collection->push($item);
                    $item->cancel_flag = 'Y';
                    $item->user_id = $user_id;
                    $item->save();
                }
                break;
            case 'rooms':
                $rooms = $data;
                foreach ($rooms as $room) {
                    foreach ($room->items as $item) {
                        $collection->push($item);
                        $item->cancel_flag = 'Y';
                        $item->user_id = $user_id;
                        $item->save();
                    }
                }
                break;
            case 'item_type':
                $item_type = $data;
                $items = $item_type->items;
                foreach ($items as $item) {
                    $collection->push($item);
                    $item->cancel_flag = 'Y';
                    $item->user_id = $user_id;
                    $item->save();
                }
                break;
        }
        return $collection;
    }

    public function getQRCode($item_code, $urlQR)
    {
        $qrcode = QrCode::format('png')->size(200)->margin(1)->generate($urlQR);
        $fileName = $item_code . '.png';
        Storage::disk('local')->put($fileName, $qrcode);
        return $fileName;
    }

    // public function getAllQRCodeZIP($urlRoot)
    // {
    //     $arrayOfAllCode = $this->getItemsCode();
    //     $rooms = Room::findByCancelFlag('N');
    //     if (!$arrayOfAllCode->isEmpty()) {
    //         $zipFileName = 'Items-QRcode.zip';
    //         $zip = Zip::create($zipFileName);

    //         foreach ($rooms as $room) {
    //             Storage::disk('local')->makeDirectory($room->room_code);
    //             foreach ($room->items as $item) {
    //                 $urlQR = $urlRoot . "/sendproblem/" . $item->item_code;
    //                 $qrcode = QrCode::format('png')->size(200)->margin(1)->generate($urlQR);
    //                 $name = $item->item_code . ' (' . $item->group . ')' . '.png';
    //                 Storage::disk('local')->put($room->room_code . '//' . $name, $qrcode);
    //             }
    //             if (strpos($room->room_code, "/") === false) { // find / in room code do not want to add IT/101, IT/102
    //                 // storage_path('app\\' . $room->room_code); for windows
    //                 $zip->add(storage_path('app/' . $room->room_code));
    //             }
    //         }

    //         // storage_path('app\\' . $room->room_code); for windows
    //         // $zip->add(storage_path('app/' . 'IT')); // add IT folder and subfolder (101, 102)
    //         $zip->close();
    //         foreach ($rooms as $room) {
    //             Storage::disk('local')->deleteDirectory($room->room_code);
    //         }
    //         Storage::disk('local')->deleteDirectory('IT');
    //     } else {
    //         $zipFileName = null;
    //     }

    //     return $zipFileName;
    // }

    public function getSelectedQRCodeZIP($urlRoot, $all_items_id)
    {
        $items = Item::find($all_items_id);
        $rooms = new Collection();

        foreach ($items as $item) {
            $rooms->push($item->room);
        }
        $rooms_unique = $rooms->unique('room_id');
        if ($all_items_id !== null) {
            $zipFileName = 'Items-QRcode.zip';
            $zip = Zip::create($zipFileName);

            foreach ($rooms_unique as $room) {
                Storage::disk('local')->makeDirectory($room->room_code);
                foreach ($items as $item) {
                    if ($item->room_id === $room->room_id) {
                        $urlQR = $urlRoot . "/sendproblem/" . $item->item_code;
                        $qrcode = QrCode::format('png')->size(200)->margin(1)->generate($urlQR);
                        $name = $item->item_code . ' (' . $item->group . ')' . '.png';
                        Storage::disk('local')->put($room->room_code . '//' . $name, $qrcode);
                    }
                }
                if (strpos($room->room_code, "/") === false) { // find / in room code do not want to add IT/101, IT/102
                    // storage_path('app\\' . $room->room_code); for windows
                    $zip->add(storage_path('app/' . $room->room_code));
                }
            }

            // storage_path('app\\' . $room->room_code); for windows
            // $zip->add(storage_path('app/' . 'IT')); // add IT folder and subfolder (101, 102)
            $zip->close();

            foreach ($rooms_unique as $room) {
                Storage::disk('local')->deleteDirectory($room->room_code);
            }
            Storage::disk('local')->deleteDirectory('IT');
        } else {
            $zipFileName = null;
        }

        return $zipFileName;
    }

    public function importItems($file)
    {
        try {
            $import = new ItemsImport();
            $import->onlySheets('Items');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of items success';
                return array(true, $success);
            } else {
                $error =  'Can not insert these duplicate item code: (' . implode(", ", $duplicated->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Items\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $items = array();
        foreach ($import_array as $array) {
            $items = $array;
        }
        $all_items_code = Arr::pluck($items, 'item_code');
        $duplicated = Item::whereIn('item_code', $all_items_code)->get();
        $duplicated_codes = $duplicated->pluck('item_code');
        return $duplicated_codes;
    }

    public function exportItems($all_items_id)
    {
        $items = Item::find($all_items_id);
        if ($items->isEmpty()) {
            $error =  'Please add item before export';
            return array(false, $error);
        } else {
            $itemsExport =  Excel::download(new ItemsExport($items), 'items.xlsx');
            return array(true, $itemsExport);
        }
    }
}

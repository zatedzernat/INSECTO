<?php

namespace App\Imports;

use App\Http\Models\Item;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class ItemsImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Item([
            'item_code' => $row['item_code'],
            'item_name' => $row['item_name'],
            'room_id' => $row['room_id'],
            'type_id' => $row['type_id'],
            'group' => $row['group'],
            'brand_id' => $row['brand_id'],
            'serial_number' => $row['serial_number'],
            'model' => $row['model'],
            'note' => $row['note'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Items' => new ItemsImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'item_code' => function ($attribute, $value, $onFailure) {
                //* in the future maybe check for "\", "?", and something will affect to url
                $position = strpos($value, "/");
                if ($position !== false) {
                    $onFailure('Item Code can not contain "/" (' . $value . ')');
                }

                $item = Item::where('item_code', $value)->first();
                if ($item !== null) {
                    $onFailure('Can not insert duplicate Item Code (' . $value . ')');
                }
            }
        ];
    }
}

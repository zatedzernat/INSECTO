<?php

namespace App\Imports;

use App\Http\Models\Item_Type;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class ItemTypesImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Item_Type([
            'type_name' => $row['type_name'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Item_Types' => new ItemTypesImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'type_name' => function ($attribute, $value, $onFailure) {
                // //* in the future maybe check for "\", "?", and something will affect to url
                // $position = strpos($value, "/");
                // if ($position !== false) {
                //     $onFailure('Room Code can not contain "/" (' . $value . ')');
                // }

                $item_type = Item_Type::where('type_name', $value)->first();
                if ($item_type !== null) {
                    $onFailure('Can not insert duplicate Type Name (' . $value . ')');
                }
            }
        ];
    }
}

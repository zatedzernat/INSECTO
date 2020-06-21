<?php

namespace App\Imports;

use App\Http\Models\Building;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class BuildingsImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Building([
            'building_code' => $row['building_code'],
            'building_name' => $row['building_name'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Buildings' => new BuildingsImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'building_code' => function ($attribute, $value, $onFailure) {
                // //* in the future maybe check for "\", "?", and something will affect to url
                // $position = strpos($value, "/");
                // if ($position !== false) {
                //     $onFailure('Item Code can not contain "/" (' . $value . ')');
                // }

                $building = Building::where('building_code', $value)->first();
                if ($building !== null) {
                    $onFailure('Can not insert duplicate Building Code (' . $value . ')');
                }
            }
        ];
    }
}

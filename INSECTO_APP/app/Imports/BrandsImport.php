<?php

namespace App\Imports;

use App\Http\Models\Brand;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class BrandsImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Brand([
            'brand_name' => $row['brand_name'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Brands' => new BrandsImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'brand_name' => function ($attribute, $value, $onFailure) {
                // //* in the future maybe check for "\", "?", and something will affect to url
                // $position = strpos($value, "/");
                // if ($position !== false) {
                //     $onFailure('Room Code can not contain "/" (' . $value . ')');
                // }

                $brand = Brand::where('brand_name', $value)->first();
                if ($brand !== null) {
                    $onFailure('Can not insert duplicate Brand name (' . $value . ')');
                }
            }
        ];
    }
}

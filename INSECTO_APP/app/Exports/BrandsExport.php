<?php

namespace App\Exports;

use App\Http\Models\Brand;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class BrandsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Brand::all();
    }

    public function headings(): array
    {
        return [
            'brand_name',
            'cancel_flag',
        ];
    }

    /**
     * @var Brand $brand
     */
    public function map($brand): array
    {
        return [
            $brand->brand_name,
            $brand->cancel_flag,
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Brands';
    }
}

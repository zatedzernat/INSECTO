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
    protected $brands;

    public function __construct($brands)
    {
        $this->brands = $brands;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->brands;
    }

    public function headings(): array
    {
        return [
            'brand_name',
            'cancel_flag',
            'user_id'
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
            $brand->user_id
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

<?php

namespace App\Exports;

use App\Http\Models\Building;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class BuildingsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Building::all();
    }

    public function headings(): array
    {
        return [
            'building_code',
            'building_name',
            'cancel_flag',
            'user_id'
        ];
    }

    /**
     * @var Building $building
     */
    public function map($building): array
    {
        return [
            $building->building_code,
            $building->building_name,
            $building->cancel_flag,
            $building->user_id
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Buildings';
    }
}

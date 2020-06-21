<?php

namespace App\Exports;

use App\Http\Models\Item_Type;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ItemTypesExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Item_Type::all();
    }

    public function headings(): array
    {
        return [
            'type_name',
            'cancel_flag',
        ];
    }

    /**
     * @var Item_Type $item_type
     */
    public function map($item_type): array
    {
        return [
            $item_type->type_name,
            $item_type->cancel_flag,
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Item_Types';
    }
}

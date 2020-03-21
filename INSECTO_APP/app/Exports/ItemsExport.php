<?php

namespace App\Exports;

use App\Http\Models\Item;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ItemsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Item::all();
    }

    public function headings(): array
    {
        return [
            'item_code',
            'item_name',
            'room_id',
            'type_id',
            'brand_id',
            'serial_number',
            'model',
            'note',
            'cancel_flag',
        ];
    }

    /**
     * @var Item $item
     */
    public function map($item): array
    {
        return [
            $item->item_code,
            $item->item_name,
            $item->room_id,
            $item->type_id,
            $item->brand_id,
            $item->serial_number,
            $item->model,
            $item->note,
            $item->cancel_flag,
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Items';
    }

}

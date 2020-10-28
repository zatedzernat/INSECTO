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
    protected $items;

    public function __construct($items)
    {
        $this->items = $items;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->items;
    }

    public function headings(): array
    {
        return [
            'item_code',
            'item_name',
            'room_id',
            'type_id',
            'group',
            'brand_id',
            'serial_number',
            'model',
            'note',
            'cancel_flag',
            'user_id',
            'qr_url'
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
            $item->group,
            $item->brand_id,
            $item->serial_number,
            $item->model,
            $item->note,
            $item->cancel_flag,
            $item->user_id,
            $item->qr_url
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

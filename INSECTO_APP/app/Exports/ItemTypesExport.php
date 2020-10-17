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
    protected $item_types;

    public function __construct($item_types)
    {
        $this->item_types = $item_types;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->item_types;
    }

    public function headings(): array
    {
        return [
            'type_name',
            'cancel_flag',
            'user_id'
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
            $item_type->user_id
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

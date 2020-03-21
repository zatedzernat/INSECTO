<?php

namespace App\Imports;

use App\Http\Models\Item;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ItemsImport implements ToModel, WithHeadingRow, WithMultipleSheets
{
    use WithConditionalSheets;

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Item([
            'item_code' => $row['item_code'],
            'item_name' => $row['item_name'],
            'room_id' => $row['room_id'],
            'type_id' => $row['type_id'],
            'brand_id' => $row['brand_id'],
            'serial_number' => $row['serial_number'],
            'model' => $row['model'],
            'note' => $row['note'],
            'cancel_flag' => $row['cancel_flag'],
            'update_by' => Auth::user()->name,
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Items' => new ItemsImport(),
        ];
    }

}

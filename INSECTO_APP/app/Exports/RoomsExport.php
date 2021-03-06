<?php

namespace App\Exports;

use App\Http\Models\Room;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class RoomsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    protected $rooms;

    public function __construct($rooms)
    {
        $this->rooms = $rooms;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->rooms;
    }

    public function headings(): array
    {
        return [
            'room_code',
            'room_name',
            'building_id',
            'cancel_flag',
            'user_id'
        ];
    }

    /**
     * @var Room $room
     */
    public function map($room): array
    {
        return [
            $room->room_code,
            $room->room_name,
            $room->building_id,
            $room->cancel_flag,
            $room->user_id
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Rooms';
    }
}

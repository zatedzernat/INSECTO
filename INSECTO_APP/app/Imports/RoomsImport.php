<?php

namespace App\Imports;

use App\Http\Models\Room;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class RoomsImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Room([
            'room_code' => $row['room_code'],
            'room_name' => $row['room_name'],
            'building_id' => $row['building_id'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Rooms' => new RoomsImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'room_code' => function ($attribute, $value, $onFailure) {
                //* in the future maybe check for "\", "?", and something will affect to url
                $position = strpos($value, "/");
                if ($position !== false) {
                    $onFailure('Room Code can not contain "/" (' . $value . ')');
                }

                $room = Room::where('room_code', $value)->first();
                if ($room !== null) {
                    $onFailure('Can not insert duplicate Room Code (' . $value . ')');
                }
            }
        ];
    }
}

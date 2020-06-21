<?php

namespace App\Imports;

use App\Http\Models\Problem_Description;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithValidation;

class ProblemDescriptionsImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithValidation
{
    private $prob_desc;
    use WithConditionalSheets;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Problem_Description([
            'problem_description' => $row['problem_description'],
            'type_id' => $row['type_id'],
            'cancel_flag' => $row['cancel_flag'],
            'user_id' => $row['user_id']
        ]);
    }

    public function conditionalSheets(): array
    {
        return [
            'Problem_Descriptions' => new ProblemDescriptionsImport(),
        ];
    }

    public function rules(): array
    {
        return [
            'problem_description' => function ($attribute, $value, $onFailure) {
                // //* in the future maybe check for "\", "?", and something will affect to url
                // $position = strpos($value, "/");
                // if ($position !== false) {
                //     $onFailure('Room Code can not contain "/" (' . $value . ')');
                // }
                $this->prob_desc = $value;
            },

            'type_id' => function ($attribute, $value, $onFailure) {
                dd($this->prob_desc);
                // $problem_desc = Problem_Description::where('type_id', $value)->first();
                // if ($problem_desc !== null) {
                //     $onFailure('Can not insert duplicate Type Name (' . $value . ')');
                // }
            }
        ];
    }
}

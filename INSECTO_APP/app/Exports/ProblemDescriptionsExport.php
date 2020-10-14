<?php

namespace App\Exports;

use App\Http\Models\Problem_Description;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ProblemDescriptionsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Problem_Description::all();
    }

    public function headings(): array
    {
        return [
            'problem_description',
            'type_id',
            'cancel_flag',
            'user_id'
        ];
    }

    /**
     * @var Problem_Description $prob_desc
     */
    public function map($prob_desc): array
    {
        return [
            $prob_desc->problem_description,
            $prob_desc->type_id,
            $prob_desc->cancel_flag,
            $prob_desc->user_id
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Problem_Descriptions';
    }
}

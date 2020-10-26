<?php

namespace App\Exports;

use App\Http\Models\Notification_Problem;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class NotificationProblemsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    protected $noti_probs;

    public function __construct($noti_probs)
    {
        $this->noti_probs = $noti_probs;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->noti_probs;
    }

    public function headings(): array
    {
        return [
            'Noti ID',
            'Item Code',
            'Status',
            'Problem Description ID',
            'Problem Description',
            'Service Desk Code',
            'Note',
            'Created At',
            'Updated At',
            'User Name'
        ];
    }

    /**
     * @var Notification_Problem $noti_probs
     */
    public function map($noti_probs): array
    {
        return [
            $noti_probs->noti_id,
            $noti_probs->item->item_code,
            $noti_probs->status->status_name,
            $noti_probs->problem_des_id,
            $noti_probs->problem_description,
            $noti_probs->service_desk_code,
            $noti_probs->note,
            $noti_probs->created_at,
            $noti_probs->updated_at,
            $noti_probs->user->name,
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Notification Problems';
    }
}

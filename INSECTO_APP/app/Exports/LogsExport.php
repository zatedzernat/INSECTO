<?php

namespace App\Exports;

use OwenIt\Auditing\Models\Audit;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class LogsExport implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithMapping
{

    protected $audits;

    public function __construct($audits)
    {
        $this->audits = $audits;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->audits;
    }

    public function headings(): array
    {
        return [
            'created_at',
            'event',
            'auditable_type',
            'old_values',
            'new_values',
            'user_id',
            'url',
            'ip_address',
            'user_agent'
        ];
    }

    /**
     * @var Audit $audit
     */
    public function map($audit): array
    {
        return [
            $audit->created_at,
            $audit->event,
            $audit->auditable_type,
            $audit->old_values,
            $audit->new_values,
            $audit->user_id,
            $audit->url,
            $audit->ip_address,
            $audit->user_agent,
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'History_logs';
    }
}

<table id="add-money-report-data-table-list" class="table table-bordered table-hover ">
    <thead>
    <tr>
      <th>No.</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Payment Type</th>
      <th>Date</th>
      <th>Time</th>
    </tr>
    </thead>
    <tbody>
        @php
        $i = 1;
        @endphp
        @forelse ($userAdd as $add)
        <tr>
        <td>{{ $i++}}</td>
        <td>
            {{ $add->amount ?? 'N/A' }}

        </td>
        <td>
            {{ $add->status ?? 'N/A' }}

        </td>
        <td>
            {{ $add->payment_id ?? 'N/A' }}

        </td>
        <td>
            {{ $add->date ?? 'N/A' }}

        </td>
        <td>
            {{ ($add->time) ?? 'N/A' }}

        </td>
        </tr>
        @empty
            <tr class="no-data-row">
                <td colspan="9" rowspan="2" align="center">
                    <div class="message"><p>No data found!</p></div>

                </td>
            </tr>
        @endforelse
    </tbody>
</table>

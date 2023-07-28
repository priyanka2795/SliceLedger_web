<table id="sale-report-data-table-list" class="table table-bordered table-hover ">
    <thead>
    <tr>
      <th>No.</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Time</th>
      <th>Date</th>
      <th>Total Amount</th>
    </tr>
    </thead>
    <tbody>
        @php
        $i = 1;
        @endphp
        @forelse ($userToken as $token)
        <tr>
        <td>{{ $i++}}</td>
        <td>
            {{ $token->price ?? 'N/A' }}

        </td>
        <td>
            {{ $token->quantity ?? 'N/A' }}

        </td>
        <td>
            {{ $token->time ?? 'N/A' }}

        </td>
        <td>
            {{ $token->date ?? 'N/A' }}

        </td>
        <td>
            {{ ($token->price * $token->quantity) ?? 'N/A' }}

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

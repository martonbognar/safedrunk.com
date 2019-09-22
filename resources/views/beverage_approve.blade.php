@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">Manage beverages</div>

    <div class="card-body">
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <div id="beverage-approve">
        </div>
    </div>
</div>
@endsection

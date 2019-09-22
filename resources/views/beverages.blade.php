@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">Manage your beverages</div>

    <div class="card-body">
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <div id="beverage-manager">
        </div>
    </div>
</div>
@endsection

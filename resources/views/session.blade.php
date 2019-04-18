@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div id="main" data-name="{{ $session->name }}"></div>
            </div>
        </div>
    </div>
@endsection

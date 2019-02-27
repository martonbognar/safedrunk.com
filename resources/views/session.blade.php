@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Session: {{ $session->name }}</div>
                    <div class="card-body">
                        <div id="main"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

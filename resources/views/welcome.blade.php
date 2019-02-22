@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            @guest
                <p>Log in.</p>
            @else
                <div id="main"></div>
            @endif
        </div>
    </div>
</div>
@endsection

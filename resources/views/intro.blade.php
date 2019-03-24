@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h1>SafeDrunk</h1>
                        <h3>Keep track of your alcohol consumption</h3>
                        <h5>Estimate your blood alcohol level and its effects on a night out</h5>
                        <h5>See how your consumption changes over time, compare different nights</h5>
                        <p><a href="{{ route('login') }}">Log in</a> to get started!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

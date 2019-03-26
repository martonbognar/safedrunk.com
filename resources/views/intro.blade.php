@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h1>SafeDrunk</h1>
                        <h3>Keep track of your alcohol consumption</h3>
                        <div class="row">
                        <div class="col-lg-4">
                        <p>Add drinks as you consume them during a session. Select beverages from our public database or define your own drinks!</p>
                        <p>See your estimated blood alcohol level and its effects on your body.</p>
                        <p>It has never been so easy to keep yourself from involuntarily drinking too much on a night out!</p>
                        </div>
                        <div class="col-lg-8">
                        <img src="/images/drinks.png" style="width: 100%;">
                        </div>
                        </div>
                        <h3 class="text-center mt-3"><a href="{{ route('login') }}" class="btn btn-primary">Log in</a> to get started!</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

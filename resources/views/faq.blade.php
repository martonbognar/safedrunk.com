@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-body">
        <h3>Adding new drinks</h3>
        <p>
        Add drinks when you first take a sip of them. The indicated blood alcohol level will show the level that you would have if you downed your drink on the spot. This means you can use it to judge whether it's safe to get another drink. If it would move you into dangerous territory, it's probably better to wait a bit and just enjoy your current intoxication level.
        </p>
        <h3>Small portions</h3>
        <p>
        If you want the alcohol level indication to be as accurate as possible, enter your drinks in smaller portions (for example, if you're planning to drink a bottle of wine over a night, enter each glass as you drink them, instead of the whole bottle at the start).
        </p>
        <h3>Mixed drinks</h3>
        <p>
        If you're drinking mixed drinks where the alcohol is evenly distributed, I recommend only tracking the amount of the alcoholic drink involved (e.g. if you're mixing 1 dl of vodka with 5 dl of orange juice, only enter the vodka to the site). If you're drinking a cocktail that is not listed on the site, your best bet is adding all of the alcoholic ingredients for the cocktail (e.g. for a Long Island Iced Tea, enter the gin, tequila, vodka, white rum and triple sec as individual entries). Or even better, calculate the alcohol content and add it as a new beverage!
        </p>
        <h3>Accuracy</h3>
        <p>
        The indicated blood alcohol level should not be treated as anything other than an educated guess. If you're using the site to check whether you're safe to drive, you probably shouldn't.
        </p>
        <h3>Adding beverages</h3>
        <p>
        If you can't find the beverage you're about to drink in the database, and think that others might drink the same thing (so you're not making it yourself in a shed), please make sure you get all the details right when adding it, and submit it to the global database! It will appear there after a sanity check by an administrator.
        </p>
        <h3>Effects and the progress bar</h3>
        <p>The effect list is based on <a href="https://en.wikipedia.org/wiki/Blood_alcohol_content#Effects_by_blood_alcohol_content">this Wikipedia article</a>, the progress bar maxes out at 0.2% BAC, because that seems like a point you don't want to reach if your goal is to have a good time.</p>
    </div>
</div>
@endsection

@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">{{ __('Modify your data') }}</div>

    <div class="card-body">
        <form method="POST" action="{{ route('settings_post') }}">
            @csrf

            <div class="form-group row">
                <label for="sex" class="col-md-4 col-form-label text-md-right">{{ __('Sex') }}</label>

                <div class="col-md-6">
                    <select id="sex" name="sex" class="form-control{{ $errors->has('sex') ? ' is-invalid' : '' }}" required>
                        <option value="female" {{ $user->sex == "female" ? 'selected' : '' }}>Female</option>
                        <option value="male" {{ $user->sex == "male" ? 'selected' : '' }}>Male</option>
                    </select>

                    @if ($errors->has('sex'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('sex') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="weight" class="col-md-4 col-form-label text-md-right">{{ __('Weight') }}</label>

                <div class="col-md-4">
                    <input id="weight" type="number" class="form-control{{ $errors->has('weight') ? ' is-invalid' : '' }}" name="weight" value="{{ $user->weight }}" required>

                    @if ($errors->has('weight'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('weight') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="col-md-2">
                    <select id="weight_unit" name="weight_unit" class="form-control{{ $errors->has('weight_unit') ? ' is-invalid' : '' }}" required>
                        <option value="kg" {{ $user->weight_unit == "kg" ? 'selected' : '' }}>kg</option>
                        <option value="lbs" {{ $user->weight_unit == "lbs" ? 'selected' : '' }}>lbs</option>
                        <option value="stone" {{ $user->weight_unit == "stone" ? 'selected' : '' }}>stone</option>
                    </select>

                    @if ($errors->has('weight_unit'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('weight_unit') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"></label>
                <div class="col-md-6">
                    <div class="form-check">
                        <input type="checkbox" id="newsletter" class="form-check-input" name="newsletter" {{ $user->newsletter ? 'checked' : '' }}><label for="newsletter" class="form-check-label">Notify me about new features on the site</label>
                    </div>
                </div>
            </div>

            <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Modify') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection

{{--
    @name Header component
    @desc The post header with the title
--}}

<!-- /codigo/resources/views/partials/page-header.blade.php -->
<div class="page-header 
    @option('layout_container')
">
   @hasfield('layout_hide_title')
   @else 
    <h1>{!! $title !!}</h1>
    @endfield
</div>
<!-- End/codigo/resources/views/partials/page-header.blade.php -->

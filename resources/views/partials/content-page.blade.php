{{--
    @name Content Page
    @desc The content layout for pages
--}}

<!-- /codigo/resources/views/partials/content-page.blade.php -->
<div class="@option('layout_container')">
    @php(the_content())

    @if ($pagination())
    <nav class="page-nav" aria-label="Page">
      {!! $pagination !!}
    </nav>
  @endif
</div>
<!-- End /codigo/resources/views/partials/content-page.blade.php -->

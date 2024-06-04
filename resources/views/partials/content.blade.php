{{--
    @name Content Card
    @desc The content layout for posts cards
--}}

<!-- /codigo/resources/views/partials/content.blade.php -->
<article @php(post_class( get_field('layout_container', 'option') ))>
  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>

    @include('partials.entry-meta')
  </header>

  <div class="entry-summary">
    @php(the_excerpt())
  </div>
</article>
<!-- End /codigo/resources/views/partials/content.blade.php -->
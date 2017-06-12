# iScrollDropdownMenu

A touch menu with dropdowns using iScroll

## Usage

Include Javascript and CSS files :
- iScrollDropdownMenu.bundle.js
- iScrollDropdownMenu.css

### Markup

```
<div class="iScrollDropdownMenu-wrapper">
    <div class="scroller">
        <ul>
            <li><a href="">My link</a></li>
            <li><a href="">Another link with dropdown</a>
                <div class="dropdown-menu">
                    <ul>
                        <li><a href="">A link in the dropdown</a></li>
                    </ul>
                    <button data-toggle="close">&times;</button>
                </div>
            </li>
        </ul>
    </div>
</div>
```

### Initialization

```
$('.iScrollDropdownMenu-wrapper').iScrollDropdownMenu({
    // with default options...
    scrollerClass: 'scroller',
    startAtItem: 0,
    forceStartAtItem: true,
});
```



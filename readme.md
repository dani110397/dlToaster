# DLToaster
DLToaster ist eine leichte und benutzerfreundliche JavaScript-Bibliothek für die Implementierung von Toast-Benachrichtigungen in Webanwendungen. Mit DLToaster können Sie einfach und effektiv Toast-Nachrichten anzeigen, um Benutzer über bestimmte Ereignisse oder Informationen zu informieren.

## Features
| Feature | Default | Other |
| ------- | ------- | ----- |
| position | top-right | top-left, top-center, bottom-left, bottom-center, bottom-right |
| autoClose | 5 | number or false |
| manuallyClose | true | true/false |
| append | before | before/after |
| textColor | #000 | #fff, #123, red .... |
| backgroundColor | #fff | #000, orange ... |
| progressBar | false | true/false |
| progressColor | linear-gradient(90deg, rgba(255,0,0,1) 20%, rgba(250,146,0,1) 40%, rgba(250,192,0,1) 60%, rgba(250,230,0,1) 80%, rgba(236,250,0,1) 100%) | gradient or color|
| border | true | true/flase |
| icon | svg icon | string |

## Methoden
| Methode | Action |
| ------- | ------- |
| show | shows the toaster |
| remove | removes the toaster from dom |

## Example
```
<script type="module">
    import DLToaster from '../toaster.js';

    var toaster = new DLToaster({
        mainText: "My name is Toast",
        detailText: "testhvdshv sdfh",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>',
        progressBar: true,
        autoClose: false,
        position: "bottom-center",
        append: "after"
    });

    toaster.show({mainText:"", detailText:"", position:""});
</script>
```

## Events
| Event | Fires if |
| ------- | ------- | 
| dlToast:closeing | Toaster is closeing
| dlToast:close | Toaster is closed
| dlToast:show | Toaster shows

# Banner Writer

This web application was created by Electra, you can message me on Discord at @electraminer
It was made to allow easy communication using alternative writing scripts in Minecraft.
You can create banners of the symbols you need and save them to type quickly.

## API

The app is currently hosted on https://banner-writer.web.app. You can use this page to write your banners.
You can use the URL parameter writing=BANNERFONT to open the page with banners already loaded.
URLs with the path /image/BANNERFONT will return an image of banners.

## BannerFont

BannerFont is a Unicode representation of banners using the Private User Area. You can use this standard to represent banners
in your own programs if needed, as well as to interface with Banner Writer via its API.
A banner is represented using unicode character `EXYY` where X is the color, in hex, and Y is the pattern, in BCD.
You can look at the Color.ts and Pattern.ts files for a full list of these values with numbers, or check the order on the site.
The pattern 00 represents the background of a banner.
Banner patterns are separated by unicode character `CFFF7`, representing a negative space (so the banner patterns are overlayed)
A space can be represented by either a space (unicode `20`) or an underscore (unicode `5F`). The underscore is preferred when creating URLs.
A newline must be represented by the character `E00A`, followed by a whitespace of some kind (either a space, an underscore, /n, or /r/n). This special character is used to differentiate spaces from newlines in URLs, where spaces cannot be used.
Since banners can be used to write many langugaes, they can either be used left-to-right or right-to-left. While writing BannerFont, you should always write each line from left-to-right, as this is how it will render when displayed as text. You can prefix the text with `E00D` for LTR or `E00E` for RTL to mark the direction, to aid special rendering/editing programs like this.
You can mark the end of BannerFont with `E00F`. This is optional but can be used to separate BannerFont from other scripts in a message.

## Building and running

If you want to develop the app and run the server, you can just run `npm start`, which builds the app with typescript and launches the built-in Express server.
Running `npm run build` will prepare the app to be deployed using Firebase.
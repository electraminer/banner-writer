import './AboutPage.css';
// External dependencies
import React from "react";

export default function AboutPage({}) {
    return (
        <div className='AboutPage'>
            <p>
                BANNER-WRITER is a web app created by Electra. <br/>
                I created it to assist&nbsp;
                <a href="https://discord.gg/hPn6P3hqbB">Clongcraft</a>
                , a Minecraft server developing its own language, but it can
                be used to help write any language in banners, or just make cool patterns.
                <br/><br/>
                Here's a summary of how to use each of the app's features:
                <ul>
                    <li>
                        Creating banners<br/>
                        To create banners, select your color and pattern with
                        the selection panels on the left. You can click the two squares
                        showing the two selected colors to swap them, useful to create
                        banners with two colors faster. On PC, you can right-click to
                        select and use the secondary color.
                    </li><br/>
                    <li>
                        Editing banners<br/>
                        You can view the layers of the current banner directly to the
                        right of the selection panels. You can remove any layer with
                        the X and swap layers with the two-arrows button. You can also
                        change the color of a layer by clicking on it. The background
                        layer is displayed as a square at the top of the stack, and its
                        color can also be changed.
                    </li><br/>
                    <li>
                        Typing<br/>
                        Under the display of the selected banner are four buttons.<br/>
                        ADD BANNER: Types the selected banner at your cursor.<br/>
                        ADD SPACE: Types a space at your cursor.<br/>
                        ADD LINE: Adds a newline at your cursor.<br/>
                        BACKSPACE: Deletes the last banner, space, or newline at your cursor.<br/>
                        You can also left-click the banner display to type it,
                        or right-click to backspace.
                    </li><br/>
                    <li>
                        Typing quick-access banners<br/>
                        The area with "RECENT BANNERS" and "SAVED WRITINGS" is meant to
                        allow quick access to banners you've already created, so you
                        don't have to recreate them each time. Any banner in this section
                        can be left clicked to type it, or right clicked to select it
                        without typing it (for instance, to edit it and create a similar
                        banner.) The "RECENT BANNERS" area contains all of the banners
                        you have ever used sorted by recency, so you can always find
                        a banner you've used before here.
                    </li><br/>
                    <li>
                        Saving and organizing banners<br/>
                        While "RECENT BANNERS" contains every banner you've used, you
                        may want to sort your banners in a more customized way. To do this,
                        you can add your writings to the "SAVED WRITINGS" section.
                        Pressing a "+" button in this section will add the writing you
                        are currently editing below that line. These banners will now
                        be easily accessible and organized for you. For instance, you
                        could type out each letter of the alphabet and then save it to
                        keep these banners in order permanently. You can always go back
                        and edit an existing writing by pressing "EDIT", or swap their
                        order with the swap button. To delete a writing, first EDIT it,
                        and then press the X that appears.
                    </li><br/>
                    <li>
                        Title bar controls<br/>
                        The title bar contains important controls to import and export
                        writings, among other things.<br/>
                        FONT: Toggles between displaying the app in BannerFont and
                        Consolas, use whatever you find easier to read.<br/>
                        L to R: This yellow button with an arrow toggles the writing
                        direction of the current writing. You can use this if you want
                        to use Minecraft banners to represent a language that's written
                        in the other direction, like Arabic.<br/>
                        IMAGE: Copies a URL containing an image of the current writing.<br/>
                        ANVIL: Exports the current writing in a way that can be displayed
                        in Minecraft anvils using a&nbsp;
                        <a href="https://cdn.discordapp.com/attachments/1167155884825256026/1177393544286183485/BannerFont.zip?ex=65a9b72f&is=6597422f&hm=297c23f5466d8886614b941080f5ad7f087653efc7cd6f7adfc3461c2a0a9430&">
                            resource pack.
                        </a><br/>
                        COPY: Exports the current writing as Unicode characters.<br/>
                        PASTE: Imports a string of Unicode characters from the COPY button.<br/>
                        CODE: Imports a banner from the /getbannercode command on Clongcraft.<br/>
                    </li>
                </ul>
            </p>
            <a href='/'>Back to app</a>
        </div>
    );
}
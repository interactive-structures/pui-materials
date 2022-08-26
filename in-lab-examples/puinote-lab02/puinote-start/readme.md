# Lab Exercise 01

## Introduction

In this lab exercise, we will:
- Create a layout for a single "notecard", to be used in our PUI-NOTE app
- Understand the CSS box model
- Apply custom fonts and colors to HTML elements


## Height, Width, Color, and Margins

1. Start by adding a box that will become our notecard. The `<div>` element is the generic content container, so we'll use that. Attach a css class called `notecard`, so that we know what this element represents.

2. Add some placeholder text between the `<div></div>` tags, and save your file. You should see the newly added element in the browser.

```
<div class="notecard">
    Write whatever you like here!
</div>
```

<!--How tall and how wide should the notecard be? Where should it be positioned on the page? -->

When first laying out elements, it can help to give them a unique background color, even if it's temporary. This allows us to catch positioning issues we might otherwise miss.

3. In `notecard.css`, define a class named `.notecard`. Add a background color, save the file, and observe the element in the browser. (Be sure to include the `.` prefix before the class name, and a `;` after the CSS rule.)

```
.notecard {
    background-color: #515151;
}
```

Take a look at the notecard element in the browswer. How wide is it? By default, block-level elements will expand horizontally to cover 100% of their parent container. The parent of our notecard is the `<body>` element, so our notecard expands to the width of the entire page.

Our element doesn't look much like a notecard at this point, so let's adjust the dimensions:

4. Within the `.notecard` class, set a width of 490 pixels and a height of 200 pixels. Add rounded corners with a radius of 8 pixels.

```
.notecard {
    width: 450px;
    height: 200px;
    border-radius: 8px;
    background-color: #515151;
}
```

Let's give our element a bit of breathing room:

5. Add a new CSS rule in the `.notecard` class, adjusting the top margin to 100 pixels.

```
    margin-top: 100px;
```

In Chrome, right-click the notecard and select "Inspect Element". Scroll to the bottom of the "Styles" section and you will see a representation of our notecard -- a blue content box with dimensions 450x150 px, and an orange margin of 100 px on top. Take note of this Chrome feature, it can be a helpful aid when debugging layouts.

Block-level elements like our notecard are left-aligned by default. How do we center the element within its parent container?

6. First, try adding a left margin to our `.notecard` class.

```
    margin-left: 100px;
```

That's a little closer to the center... but it's not really what we want.

7. Change the value of the left-side margin to `auto`. The browser will automatically expand this margin so that it takes up all of the empty horizontal space.

Notice that the left-side margin has now pushed our element all the way to the right side of the screen! (That's useful in some cases, but still not what we're looking for.)

8. Add a right-side margin (`margin-right`) with a value of `auto`. These two margins now "push against each other", and center our notecard horizontally.

9. If you like, you can replace the three margin rules with this more concise syntax:
```
    margin: 150px auto 0px auto;
```

Those four values set the margin on the top, right, bottom, and left side of element, respectively. The choice of syntax is up to you! Use whatever is easier to read at a glance.

---

## Padding and Bounding Boxes

Take a look at the placeholder text in the browser -- notice that it's right up against the edge of our notecard. We can add a bit of a buffer zone with the `padding` rule.

Padding can be applied to each side of our box individually, just like a margin. Alternatively, we can add a uniform padding to all sides of our element.

10. Apply a uniform padding of 20 pixels to the notecard.
```
    padding: 20px;
```

(Note: this syntax works for uniform margins too.)

Take a look at the notecard element in the Chrome Developer Console (right-click the notecard and select "Inspect"). In the "Styles" tab, toggle the padding you just added by unchecking and checking the `padding` checkbox. Observe what happens to the notecard element.

Earlier, we set a width of 450 pixels for the notecard element. By default, this width applies to something called the "Content Box" – and it does *not* include any padding. In the Developer Console, scroll down to the box representation and take a look at the box representation. The blue content box should be shown with dimensions of 450 x 150 pixels, and the green padding adds an additional 20 pixels to each side. From edge to edge, our gray notecard is now 490 pixels wide (450px + 20px + 20px).

This is not always desirable! Often, we would like our defined width to *include* the padding.

11. Add a sizing rule to the notecard class, like so:
```
    box-sizing: border-box;
```

Go back to the Developer Console and toggle the padding again. Observe the results – the notecard width is now consistent, and the padding is instead added to the "inside" of the element. Notice that the width of the blue "Content Box" is now 410 pixels after the padding is added.

---

## Horizontal Positioning (Main Area and Sidebar)

Take a look at the notecard mockup from earlier. We can divide this notecard into two sections – a main area on the left (holding note text and images), and a sidebar on the right (holding collpase, edit, and delete icons).

12. In `index.html`, remove the placeholder text from the notecard element. In its place, add two new elements, which will represent the left and right sections of the notecard. Add class names accordingly.
```
<div class="notecard">
    <div class="notecard-left">
        L
    </div>
    <div class="notecard-right">
        R
    </div>
</div>
``` 

13. In 'notecard.css`, add a different background color for each of the new notecard elements.
```
.notecard-left {
    background-color: blue
}
.notecard-right {
    background-color: green
}
```

Notice that by default, each of the elements expand to reach 100% of the parent width. Also notice that the elements are stacked on top of each other. How can we position these elements so that they are side by side?

Your first instinct might be to adjust the width of each element. We can give this a shot:

13. Set the width of `notecard-left` to 60% of its parent's width. Set the width of `notecard-right` to 40% of its parent's width.
```
.notecard-left {
    width: 60%;
    background-color: blue;
}
.notecard-right {
    width: 40%;
    background-color: green;
}
```

We've chosen proper widths, but the elements still appear on top of each other. As it turns out, regardless of their widths, block-level elements (such as `<div>`) will always stack on top of each other – each new `<div>` will be placed on a new line.

To make these elements sit side-by-side, on the same line, we will first modify the *parent* element.

14. In the `notecard` class, add a new display rule as shown:
```
    display: flex;
```

We have now converted `notecard` into a ***flex container***, and its two child elements, `notecard-left` and `notecard-right`, are now ***flex children***. Unlike standard block elements, which always appear on a new line, ***flex children*** try to get as close to each other as possible. Notice that `notecard-left` and `notecard-right` are now on the same line!

Also notice that by default, flex children stretch vertically until they reach the height of their parent element.

Take another look at the notecard mockup. Currently, the sidebar width is 40% of our notecard, but we would like it to be a fixed value:

15. Change the width of `notecard-right` to 30 pixels.

You should notice a couple changes – the sidebar width is now correct, but it is not on the right side of the notecard. Recall that by default, flex children try to sit as close to each other as possible. How can we push the sidebar to the right side?

One way to solve this is by adding a left margin, as we did earlier in this excercise.

16. Add an `auto` margin to the left side of `notecard-right`.
```
    margin-left: auto
```
Just as before, the browser expands this margin as much as it can, pushing `notecard-right` to the right side of its parent element.

Now, let's set the width of `notecard-left`. We'd like it to take up the remaining space in the notecard – it should be the full notecard width, minus the width of the 30 pixel sidebar. Let's look at a couple ways of doing this.

17. Use the CSS `calc()` function to set the width of `notecard-left`:
```
    width: calc(100% - 30px);
```

Since we're defining the width in terms of both a percentage *and* a pixel value, we have to use the CSS `calc` function. But this works! Check the browser, and you should see that `notecard-right` is 380 pixels wide.

Still, what happens if we later decide to change the width of `notecard-right`? Our width for `notecard-left` would now be outdated and incorrect.

What we would really like is for `notecard-left` to extend as far as it can go without squishing the 30 pixel sidebar. Perhaps if we set the width to `auto`?

18. For `notecard-left`, remove the previous width rule, and instead add `width: auto`.

No luck! But we've discovered one of the unique features of flex children. Unlike standard block elements, which expand as far as possible when using `auto` width, flex children will not expand beyond their contents when using `auto` width. Notice that as soon as the text ends, the background color ends.

What else can we try?

19. Add the following property to `notecard-left`:
```
    flex-grow: 1:
```

The `flex-grow` property applies only to flex children, and determines how they will behave when there is extra space around them. Since we set `flex-grow` to `1`, the `notecard-left` element will try to expand into the unused space. Looks good!

We are almost done with the sidebar layout, but there's a small hidden problem here. In `index.html`, modify the `notecard-left` content to include a long-ish sentence:

```
<div class="notecard-left">
    I've replaced the letter "L" with a long-ish sentence,
    that's a bit more representative of what actual
    content might look like.
</div>
```

Now take a look at what's happened to `notecard-right` (right click -> Inspect). Scroll down the box representation, and notice that the width of `notecard-right` is *less* than 30 pixels! The `notecard-left` element has tried to expand as far as it can, and in doing so, it's squeezing the `notecard-right` element.

Luckily, there is a simple fix here!

20. Add the following property to `notecard-right`:
```
    flex-shrink: 0:
```

Finally, we've solved our sidebar problem. Adding `flex-shrink: 0` will prevent `notecard-right` from shrinking below its specified width of 30 pixels.

To recap, when horizontally positioning elements, we two methods of setting the widths:

**Method 1:**
```
.notecard-left {
    width: calc(100% - 30px);
}
.notecard-right {
    width: 30px;
}
```

**Method 2:**
```
.notecard-left {
    flex-grow: 1;
}
.notecard-right {
    width: 30px;
    flex-shrink: 0;
}
```

Method 1 is (arguably) easier to understand, but if we decide to change the sidebar width, then we have to update both `notecard-left` and `notecard-right`. Method 2 is a bit trickier to understand, but it's more robust, as `notecard-left` adapts automatically.

---

## Boxes Within Boxes

Let's now add some content to the left side of the notecard. Take another look at the mockup – there are four elements that we need to place: (1) the image, (2) the note title, (3) the note body, and (4) the footer/timestamp.


One strategy for planning layouts is to create a system of "boxes within boxes". Then, for each box, commit to laying out the contents either horizontally or vertically.

For example, the note title and note body (highlighted in green, below) can both be contained within a parent box (highlighed in blue), and arranged vertically. Then, the zebra image and the blue box can be arranged horizontally, inside another parent box (highlighted in red) and arranged horizontally. Finally, the red box and the footer text can be arranged vertically inside of `notecard-left`.

Let's open `index.html` and try to create this layout. We'll specify all the elements first, and then add the styles and positioning.

21. Start at the outside and work inward – first create the "red" box and the footer text:


```
<div class="notecard-left">
    <div class="notecard-main-content">
    </div>

    <div class="notecard-footer">
        Footer text goes here
    </div>
</div>
```

22. Now add the zebra image and the "blue" box:

```
    <div class="notecard-main-content">
        <img class="notecard-thumbnail" src="assets/warhol-zebra.png" />

        <div class="notecard-text">
        </div>
    </div>
```

23. And finally, we add the note title and note body text.


```
        <div class="notecard-text">
            <div class="note-title">
                A Placeholder Title Goes Here
            </div>
            <div class="note-body">
                Here is some placeholder body text. And here is some more...
                and wait, here is even more! look at all this text! It just
                keeps going and going and going.
            </div>
        </div>
```


(Note that for the `<img>` tag in step 22, we added two properties – the class and the image source. Also note that a closing tag is not necessary.)

If your placeholder sentences were long, you may notice that the content is "overflowing". Let's quickly fix that by modifying the height of the notecard:

24. Change the `height` property of `notecard` to `min-height: 150px`.

The notecard should expand vertically to contain all of the new content.

Let's style and position these elements. We'll start with the title and body text.

25. In `notecard.css`, create classes for the note title and body. Then update the font size, font weight, and font color:

```
.note-title {
  font-size: 18px;
  font-weight: 500;
}

.note-body {
  font-size: 14px;
  font-weight: 400;
  color: #939393;
}
```

In the Chrome Developer console, highlight the `notecard-text` element. Notice that it contains both the notecard title and notecard body text. We want to position this `notecard-text` element so that it sits to the right of the zebra image (`notecard-thumbnail`).

How will we do this? Just as before, we will convert `notecard-thumbnail` and `notecard-text` into *flex children*. Recall the flex children will try to get as close together as possible, meaning that they will sit on the same line by default.

26. Find the parent element of `notecard-thumbnail` and `notecard-text`. Add a `display: flex` rule, which will turn the child elements (`notecard-thumbnail` and `notecard-text`) into flex children.
```
.notecard-main-content {
    display: flex;
}
```

Check the mockup – the horizontal and vertical layout is complete! All that's left is fine-tuning.

---

## Image Sizing and Finishing Touches

27. Add a class for the thumbnail image, and adjust the width and height:

```
.notecard-thumbnail {
    width: 70px;
    height: 70px;

  object-fit: cover;
}
```

The `object-fit: cover` property positions the image so that it covers the entire 70x70 px area. It will be scaled down, but keep the same aspect ratio. Any parts of the image that fall outside of the 70x70 area will be clipped. This is useful for cases where our image isn't an exact square, but needs to fit into a square.

28. Add rounded corners to the image:
```
  border-radius: 5px;
```

Let's put some space between the image and the note text, so it looks more like the mockup.

29. Add a 26 pixel `margin-top` and 20 pixel `margin-left` to `notecard-text`.

30. Add a 10 pixel `margin-bottom` to `note-title`.

Almost there! All we have to do now it format the footer.

31. Add a `notecard-footer` class, and adjust the font and margins:
```
.notecard-footer {
    margin-top: 15px;
    font-size: 12px;
    color: #595959;
}
```

32. In `index.html`, swap the placeholder text in the footer with an example timestamp.
```
<div class="notecard-footer">
    Sep 1 2022, 12:30
</div>
```

And we're done! You can change the background colors now if you like – the mockup uses `#212121`.


<!--**HTML:** What are the names of the boxes? What do the boxes contain?

> Note that in addition to text and images, boxes can contain other boxes!

**CSS:** Where are the boxes positioned? What do they look like?-->

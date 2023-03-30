# freegal-media-controls
UserScript that adds media button (next, prev) and music metadata support to Freegal

# Installation

1. Install [TamperMonkey](https://www.tampermonkey.net/index.php) browser extension
2. Open the `⚙️ Dashboard`

    ![Screenshot of the menu](img/tampermonkey-1-menu.png)

3. Click on the `Utilities` tab
4. Under `Import from URL`, paste the URL for the raw contents of the script:

    ```
    https://raw.githubusercontent.com/adutton/freegal-media-controls/main/freegal-media-controls.js
    ```
  
    and click `Install`


    ![Screenshot of the menu](img/tampermonkey-2-utilities.png)

5. Approve the `Cross Origin Request Permission`

    ![Screenshot of the menu](img/tampermonkey-3-permissions.png)

6. Script is installed

# Release Notes

## 1.0 Initial Release

* Supports prev/next buttons
* Updates music metadata upon changes
* Known issue: Does not take effect until a play button is pressed manually and the player is visible
* Known issue: There is a small delay in updating the metadata

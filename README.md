# dotfiles

<img src="misc/ocean.png">

This repo holds my dotfiles & various other things for my desktop (`blueno`) and laptop (`lambda`).

## Setup

- Distro: `Arch Linux`
- Window Manager: `i3-gaps`
- Shell: `bash`
- Terminal: `urxvt`/`kitty`
- Notifications: `dunst`
- Launcher: `rofi`
- Music: `spotify`
- Editor: `emacs` / `atom`
- Browser: `firefox-nightly`


## Structure

- `*.theme/`: A theme usable by `retheme`
  - `.wallpaper`: Wallpaper
  - `.theme`: Color definitions
- `archived/`: Old themes I don't use anymore
- `main/`: Pretty much everything that gets linked, mostly self-explanatory
  - `.config/`: Where all my config files are
  - `www`: Root of start page served to `localhost`
  - `bin/`: Scripts I've made and found useful
    - `color/`: Color test scripts
    - `rofi/`: Rofi prompts bound to shortcuts
    - `support/`: Things not on my path but used by `i3`/`polybar`
- `packages/`: Backup of all the packages on each machine
- `root/`: Mirrors the structure of `/`, holds machine-wide configuration files
- `misc/`: Resources and various odds and ends

Notably `main` and themes are managed by [`stow`](https://www.gnu.org/software/stow/).

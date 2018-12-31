# .files

This repo holds my dotfiles & various other things for my laptop

## Setup

- Distro: `Arch Linux`
- Window Manager: `i3-gaps`
- Shell: `fish`
- Terminal: `alacritty`
- Notifications: `dunst`
- Launcher: `rofi`
- Music: `spotify`
- Editor: `emacs`
- Browser: `firefox-nightly`

## Structure

- `brown/`: Things used only in my setup on brown CS dept computers
- `gen/`: Files generated from templates for a theme (not present in repo)
- `main/`: Pretty much everything that gets linked, mostly self-explanatory
  - `.config/`: Where all my config files are
  - `.www`: Root of start page served to `localhost`
  - `bin/`: Scripts I've made and found useful
    - `alias/`: Wrappers around other commands
    - `color/`: Color test scripts
    - `rofi/`: Rofi prompts bound to shortcuts
    - `spoc/`: Scripts I use for sysadmin stuff
    - `support/`: Scripts not used directly, but rather by things like `i3`/`polybar`
    - `tmp/`: Experimental or only temporarily useful scripts
- `misc/`: Resources and various odds and ends
- `root/`: Mirrors the structure of `/`, holds machine-wide configuration files
- `template/`: Configs to template with theme data
- `themes/`: Themes stored in [base16](http://chriskempson.com/projects/base16/) format

## Install

To link all files the following can be run:
`sudo dotlink -f all`

(require 'neotree)
(global-set-key (kbd "C-\\") 'neotree-toggle)
(setq neo-theme (if (display-graphic-p) 'icons 'arrow))

(set-window-fringes neo-global--window 1 0)

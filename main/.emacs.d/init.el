
;; Custom set variables
(setq custom-file "~/.emacs.d/custom.el")
(if (file-exists-p custom-file)
    (load custom-file))

(load-file "~/.emacs.d/modules/package.el")
(load-file "~/.emacs.d/modules/font.el")
(load-file "~/.emacs.d/modules/main.el")
(load-file "~/.emacs.d/modules/keybind.el")
(load-file "~/.emacs.d/modules/modeline.el")

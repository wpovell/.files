;; Custom set variables
(setq custom-file "~/.emacs.d/custom.el")
(if (file-exists-p custom-file)
    (load custom-file))

(defun isgui () "Return t if in a GUI mode."
       (or
        (window-system)
        (string= (daemonp) "gui")))

(if (isgui)
    (load-file "~/.emacs.d/modules/font.el"))

(load-file "~/.emacs.d/modules/package.el")
(load-file "~/.emacs.d/modules/main.el")
(load-file "~/.emacs.d/modules/keybind.el")
(load-file "~/.emacs.d/modules/modeline.el")
(load-file "~/.emacs.d/modules/org.el")

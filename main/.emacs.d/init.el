(setq backup-directory-alist `(("." . "~/.saves")))
(setq linum-format "%d  ")

;; Don't complain about symlinks
(setq vc-follow-symlinks nil)

(global-linum-mode t)
(setq inhibit-startup-message t) ;; hide the startup message

(menu-bar-mode -1)

(require 'package)

(add-to-list 'package-archives
       '("melpa" . "http://melpa.org/packages/") t)

(global-set-key (kbd "C-x <up>") 'windmove-up)
(global-set-key (kbd "C-x <down>") 'windmove-down)
(global-set-key (kbd "C-x <left>") 'windmove-left)
(global-set-key (kbd "C-x <right>") 'windmove-right)

(package-initialize)
(when (not package-archive-contents)
  (package-refresh-contents))

(defvar myPackages
  '(better-defaults
    neotree))

(mapc #'(lambda (package)
    (unless (package-installed-p package)
      (package-install package)))
      myPackages)

(require 'neotree)
(global-set-key [f8] 'neotree-toggle)

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(company-tooltip ((t (:foreground "white")))))

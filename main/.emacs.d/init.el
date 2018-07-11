;; -*- mode: elisp -*-

;; Package setup
(require 'package)
(setq package-enable-at-startup nil)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

;; Theme
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(custom-safe-themes
   (quote
    ("78496062ff095da640c6bb59711973c7c66f392e3ac0127e611221d541850de2" "a4df5d4a4c343b2712a8ed16bc1488807cd71b25e3108e648d4a26b02bc990b3" default)))
 '(git-gutter:update-interval 2)
 '(package-selected-packages
   (quote
    (magit atom-one-dark-theme helm-projectile helm yaml-mode use-package projectile org-beautify-theme nlinum neotree multiple-cursors markdown-mode git-gutter git-commit general fringe-helper fish-mode fill-column-indicator dracula-theme dashboard all-the-icons))))

(load-file "~/.emacs.d/modules/main.el")
(load-file "~/.emacs.d/modules/keybind.el")
(load-file "~/.emacs.d/modules/font.el")
(load-file "~/.emacs.d/modules/package.el")

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

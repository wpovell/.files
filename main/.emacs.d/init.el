;; -*- mode: elisp -*-

(require 'package)
(let* ((no-ssl (and (memq system-type '(windows-nt ms-dos))
                    (not (gnutls-available-p))))
       (proto (if no-ssl "http" "https")))
  (add-to-list 'package-archives (cons "melpa" (concat proto "://melpa.org/packages/")) t))
(package-initialize)

;; multiple-cursors should be in here but wasn't found?
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(custom-safe-themes
   (quote
    ("a4df5d4a4c343b2712a8ed16bc1488807cd71b25e3108e648d4a26b02bc990b3" default)))
 '(git-gutter:update-interval 2)
 '(package-selected-packages
   (quote
    (org-beautify-theme markdown-mode projectile git-gutter yaml-mode dracula-theme neotree all-the-icons dashboard page-break-lines general))))

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

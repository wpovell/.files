;; Don't put tilda files everywhere
(setq backup-directory-alist `(("." . "~/.saves")))

;; Line numbers
(global-linum-mode t)
(setq linum-format "%d  ")

;; Don't complain about symlinks
(setq vc-follow-symlinks nil)

;; hide the startup message
(setq inhibit-startup-message t)

;; Better workspace keybindings
(global-set-key (kbd "C-x <up>") 'windmove-up)
(global-set-key (kbd "C-x <down>") 'windmove-down)
(global-set-key (kbd "C-x <left>") 'windmove-left)
(global-set-key (kbd "C-x <right>") 'windmove-right)

;; No menu
(menu-bar-mode -1)

;; Package Stuff
(require 'package)
(add-to-list 'package-archives
       '("melpa" . "http://melpa.org/packages/") t)

(package-initialize)
(when (not package-archive-contents)
  (package-refresh-contents))

;; Packages to have installed
(defvar myPackages
  '(better-defaults
    neotree))

(mapc #'(lambda (package)
    (unless (package-installed-p package)
      (package-install package)))
      myPackages)

;; Neotree
(require 'neotree)
(global-set-key [f8] 'neotree-toggle)

;; Show (line, col)
(column-number-mode 1)


;; Change modeline format
(setq-default mode-line-format
      (list
       " " mode-line-modified
       " %[" mode-line-buffer-identification "%] %l:%c"))
(setq global-mode-string '((t jabber-activity-mode-string)
                          "" display-time-string appt-mode-string))

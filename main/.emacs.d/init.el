
;; Don't put tilda files everywhere
(setq backup-directory-alist `(("." . "~/.saves")))

;; Hide GUI stuff
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

;; Use spaces
(setq-default indent-tabs-mode nil)

;; Make divider prettier
(set-face-background 'vertical-border "gray")
(set-face-foreground 'vertical-border (face-background 'vertical-border))

;; Make mouse scrolling work
(xterm-mouse-mode t)
(global-set-key (kbd "<mouse-5>") '(lambda () (interactive) (scroll-up 1)))
(global-set-key (kbd "<mouse-4>") '(lambda () (interactive) (scroll-down 1)))

;; Line numbers
(global-linum-mode t)
(setq linum-format "%d  ")

;; Don't complain about symlinks
(setq vc-follow-symlinks nil)

;; hide the startup message
(setq inhibit-startup-message t
      inhibit-startup-echo-area-message t)

;; Better workspace keybindings
(windmove-default-keybindings)
(global-set-key (kbd "M-o") 'other-window)

;; IDO
(ido-mode 1)
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)



;; Package Stuff
(setq package-archives
      '(("gnu" . "http://elpa.gnu.org/packages/")
        ("melpa" . "http://melpa.org/packages/")))

(require 'package)
(add-to-list 'package-archives
       '("melpa" . "http://melpa.org/packages/") t)

(package-initialize)
(when (not package-archive-contents)
  (package-refresh-contents))

;; Packages to have installed
(defvar myPackages
  '(better-defaults
    neotree
    multiple-cursors
    xclip
    all-the-icons
    git-gutter))


;; Use spaces
(setq-default indent-tabs-mode nil)

;; Make divider prettier
(set-face-background 'vertical-border "gray")
(set-face-foreground 'vertical-border (face-background 'vertical-border))

;; Make mouse scrolling working
(xterm-mouse-mode t)
(global-set-key (kbd "<mouse-5>") '(lambda () (interactive) (scroll-up 1)))
(global-set-key (kbd "<mouse-4>") '(lambda () (interactive) (scroll-down 1)))

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
    neotree
    multiple-cursors
    xclip
    all-the-icons
    git-gutter))

(mapc #'(lambda (package)
    (unless (package-installed-p package)
      (package-install package)))
      myPackages)

(add-to-list 'auto-mode-alist '("\\.jsx\\'" . js-mode))

;; Git gutter
(global-git-gutter-mode +1)
;; Make update more
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(git-gutter:modified-sign "*")
 '(git-gutter:update-interval 1)
 '(package-selected-packages
   (quote
    (auctex multiple-cursors s neotree epl better-defaults))))

;; Set modifier char to *


;; Clipboard
(require 'xclip)
(xclip-mode 1)

;; Neotree
(require 'neotree)
(require 'all-the-icons)
(global-set-key [f8] 'neotree-toggle)
(setq neo-theme 'nerd)

;; Multiple cursors
(require 'multiple-cursors)
(global-set-key (kbd "C-p") `mc/mark-next-like-this-symbol)
(global-set-key (kbd "C-q") 'mc/mark-next-like-this)

;; Show (line, col)
(column-number-mode 1)

;; Change modeline format
(setq-default mode-line-format
      (list
       " " mode-line-modified
       " %[" mode-line-buffer-identification "%] %l:%c"))
(setq global-mode-string '((t jabber-activity-mode-string)
                          "" display-time-string appt-mode-string))
(put 'downcase-region 'disabled nil)

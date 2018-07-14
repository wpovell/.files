;; Delete backup versions
(setq delete-old-versions t)

;; Enable mouse in term emacs
(xterm-mouse-mode t)
(global-set-key (kbd "<mouse-5>") '(lambda () (interactive) (scroll-up 1)))
(global-set-key (kbd "<mouse-4>") '(lambda () (interactive) (scroll-down 1)))

;; 80 Char Col ;;
(setq-default
 whitespace-line-column 80
 whitespace-style       '(face lines-tail))
(add-hook 'prog-mode-hook #'whitespace-mode)

;; Highlight current line in GUI
(if window-system
  (global-hl-line-mode)
  (set-face-background 'mode-line "Blue")
)

;; Set scratch text
(setq initial-scratch-message ";; SCRATCH ;;")

;; Keep buffers consistent with disk
(global-auto-revert-mode t)

;; Org mode
(setf org-agenda-files '("~/org"))

;; Fish some ansi-term newline issues
(setq term-suppress-hard-newline t)

;; Use spaces
(setq-default indent-tabs-mode nil)

;; Don't put tilda files everywhere
(setq backup-directory-alist `(("." . "~/.emacs.d/backups")) )

;; Hightlight marked region
(transient-mark-mode t)

;; Hide gui GUI
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

;; Make divider prettier
(set-face-background 'vertical-border "gray")
(set-face-foreground 'vertical-border (face-background 'vertical-border))

;; Follow symlinks without asking
(setq vc-follow-symlinks t)

;; Hide the startup message
(setq inhibit-startup-message t
      inhibit-startup-screen t)

(defun display-startup-echo-area-message () (message ""))

;; Auto fullscreen on Mac
(if (eq system-type 'darwin)
    (set-frame-parameter nil 'fullscreen 'fullboth))

;; Wrap text
(setq default-fill-column 80)

;; Highlight parens
(show-paren-mode t)

;; Show column in modeline
(setq column-number-mode t)

;; Close term buffer on exit
(defadvice term-handle-exit
  (after term-kill-buffer-on-exit activate)
  (kill-buffer))

;; Line numbers
(global-display-line-numbers-mode)

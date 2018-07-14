;; Window movement
(global-set-key (kbd "<M-right>") 'windmove-right)
(global-set-key (kbd "<M-left>") 'windmove-left)
(global-set-key (kbd "<M-up>") 'windmove-up)
(global-set-key (kbd "<M-down>") 'windmove-down)

;; Easier ffap
(global-set-key (kbd "C-x C-f") 'find-file-at-point)

;; Kill buffer unless modified
(defun volatile-kill-buffer ()
   (interactive)
   (let ((buffer-modified-p nil))
     (kill-buffer (current-buffer))))
(global-set-key (kbd "C-x k") 'volatile-kill-buffer)

;; Fullscreen
(global-set-key (kbd "C-S-f") 'toggle-frame-fullscreen)

;; Term
(global-set-key (kbd "<C-return>") '(lambda () (interactive) (ansi-term "/bin/bash")))

;; Switch focus on split
(global-set-key (kbd "C-x /") (lambda ()
                                (interactive)
                                (split-window-vertically)
                                (other-window 1)))

(global-set-key (kbd "C-x \\") (lambda ()
                                 (interactive)
                                 (split-window-horizontally)
                                 (other-window 1)))


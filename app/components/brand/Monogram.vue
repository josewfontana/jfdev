<script setup lang="ts">
/**
 * Official JFDEV monogram. GENERATED from the brand package
 * (logos/monogram/jfdev-monogram-original.svg) — do not edit the paths by hand:
 * the brand manual forbids reinterpreting, distorting, rotating or adding effects.
 * Only the authorized color versions are allowed.
 */
export type MonogramColor = 'charcoal' | 'deep-teal' | 'ivory' | 'teal' | 'terracotta'

const { color, label } = defineProps<{
  color: MonogramColor
  /** Accessible name. Omit when the monogram is decorative (e.g. next to the "JFDEV" text). */
  label?: string
}>()

const COLOR_CLASSES = {
  'charcoal': 'text-brand-charcoal',
  'deep-teal': 'text-brand-deep-teal',
  'ivory': 'text-brand-ivory',
  'teal': 'text-brand-teal',
  'terracotta': 'text-brand-terracotta',
} as const satisfies Record<MonogramColor, string>
</script>

<template>
  <svg
    viewBox="0 0 871 594"
    :class="COLOR_CLASSES[color]"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <g fill="currentColor">
      <path
        d="M 441 210 L 307 342 L 307 471 L 305 473 L 141 473 L 139 471 L 142 468 L 142 467 L 145 464 L 148 459 L 152 455 L 155 450 L 159 446 L 159 445 L 162 442 L 165 437 L 169 433 L 172 428 L 176 424 L 176 423 L 179 420 L 179 419 L 182 416 L 182 415 L 185 412 L 185 411 L 188 408 L 188 407 L 191 404 L 191 403 L 194 400 L 197 395 L 201 391 L 201 390 L 204 387 L 204 386 L 207 383 L 207 382 L 217 369 L 114 369 L 113 370 L 113 371 L 108 376 L 108 377 L 103 382 L 103 383 L 99 387 L 99 388 L 95 392 L 95 393 L 89 399 L 89 400 L 85 404 L 85 405 L 75 416 L 75 417 L 71 421 L 71 422 L 57 438 L 57 439 L 44 454 L 44 455 L 31 470 L 31 471 L 27 475 L 27 476 L 23 480 L 23 481 L 18 487 L 18 489 L 28 501 L 30 505 L 40 517 L 42 521 L 46 525 L 46 526 L 55 537 L 57 541 L 84 576 L 317 576 L 367 526 L 367 525 L 369 524 L 441 452 Z"
      />
      <path
        d="M 306 302 L 307 302 L 317 292 L 317 291 L 319 289 L 320 289 L 320 288 L 322 287 L 322 286 L 326 282 L 327 282 L 330 279 L 330 278 L 335 273 L 336 273 L 338 271 L 338 270 L 340 269 L 340 268 L 342 266 L 343 266 L 346 263 L 346 262 L 348 261 L 348 260 L 352 256 L 353 256 L 354 254 L 358 250 L 359 250 L 365 244 L 365 243 L 367 242 L 370 239 L 370 238 L 374 234 L 375 234 L 380 229 L 380 228 L 382 226 L 383 226 L 402 207 L 402 206 L 406 202 L 407 202 L 411 198 L 411 197 L 413 196 L 413 195 L 415 194 L 415 193 L 417 192 L 421 188 L 421 187 L 423 186 L 426 183 L 426 182 L 428 181 L 429 179 L 432 176 L 433 176 L 434 174 L 438 170 L 439 170 L 487 122 L 762 122 L 783 99 L 783 98 L 789 92 L 789 91 L 796 84 L 796 83 L 803 76 L 803 75 L 810 68 L 810 67 L 816 61 L 816 60 L 823 53 L 823 52 L 830 45 L 830 44 L 837 37 L 837 36 L 844 29 L 844 28 L 853 18 L 454 18 L 451 21 L 450 21 L 449 23 L 447 24 L 445 26 L 445 27 L 443 28 L 439 32 L 439 33 L 437 34 L 437 35 L 435 36 L 429 42 L 429 43 L 427 44 L 360 111 L 360 112 L 358 114 L 357 114 L 357 115 L 355 116 L 306 165 Z"
        transform="translate(-2 0)"
      />
      <path
        d="M 801 177 L 475 177 L 466 186 L 466 520 L 511 475 L 511 474 L 513 472 L 514 472 L 515 470 L 517 468 L 518 468 L 519 466 L 521 464 L 522 464 L 523 462 L 529 456 L 530 456 L 531 454 L 560 426 L 560 286 L 561 285 L 708 285 L 708 284 L 728 262 L 728 261 L 746 241 L 746 240 L 757 228 L 757 227 L 764 220 L 764 219 L 770 213 L 770 212 L 776 206 L 776 205 L 783 198 L 783 197 Z"
        transform="translate(7 0)"
      />
    </g>
  </svg>
</template>

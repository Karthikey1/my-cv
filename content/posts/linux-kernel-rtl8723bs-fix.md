---
title: "Fixing a Race Condition in the rtl8723bs Driver"
date: 2026-01-11
draft: false
tags: ["Linux Kernel", "Concurrency", "C", "Staging"]
layout: "single"
---

I was digging through the `drivers/staging/rtl8723bs` code when I spotted something off in the packet transmission path.

The function `update_attrib` updates two critical things for a network station: security info and physical layer attributes. But looking at the code, these updates were happening completely unprotected.

```c
/* Before Fix */
if (update_attrib_sec_info(padapter, pattrib, psta) == _FAIL) {
    res = _FAIL;
    goto exit;
}
// <--- A lot can happen here in an SMP system
update_attrib_phy_info(padapter, pattrib, psta); 

pattrib->psta = psta;
```

In a multi-core system, if another thread tries to read the station state right in the middle of this, it gets garbage data. The security info might be new, but the PHY info is old. That's a classic race condition waiting to happen.

I fixed it by forcing the updates to be atomic using the driver's spinlock.

```c
/* After Fix */
spin_lock_bh(&psta->lock);

if (update_attrib_sec_info(padapter, pattrib, psta) == _FAIL) {
    spin_unlock_bh(&psta->lock);
    res = _FAIL;
    goto exit;
}
update_attrib_phy_info(padapter, pattrib, psta);

pattrib->psta = psta;
spin_unlock_bh(&psta->lock);
```

Used `spin_lock_bh` to disable bottom halves on the local CPU, just to be safe against softirqs. Now the station is either fully updated or not touched at all. No more half-baked state.

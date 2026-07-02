"use client";

import { createSwapy, utils } from "swapy";
import { useEffect, useRef, useState, useMemo, ReactNode } from "react";
import type { FieldArrayWithId } from "react-hook-form";

interface SwapySectionProps {
  fields: Array<FieldArrayWithId>;
  renderItem: (item: FieldArrayWithId, index: number) => ReactNode;
  onReorder: (fromIndex: number, toIndex: number) => void;
  className?: string;
}

export function SwapySection({
  fields,
  renderItem,
  onReorder,
  className,
}: SwapySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  // Track visual order via slotItemMap (needed for dynamicSwapy on add/remove)
  const [slotItemMap, setSlotItemMap] = useState(() =>
    utils.initSlotItemMap(fields, "id")
  );

  // Handle dynamic add/remove of items (Swapy's recommended pattern)
  useEffect(() => {
    if (swapyRef.current) {
      utils.dynamicSwapy(
        swapyRef.current,
        fields,
        "id",
        slotItemMap,
        setSlotItemMap
      );
    }
  }, [fields]);

  // Initialize Swapy once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    swapyRef.current = createSwapy(containerRef.current, {
      manualSwap: true,
    });

    swapyRef.current.onSwap((event: any) => {
      const newMap = event.newSlotItemMap.asArray;
      setSlotItemMap(newMap);

      // Compute move operations to transform current order to new order
      const currentFields = fieldsRef.current;
      const currentIds = currentFields.map((f: any) => f.id);
      const newIds = newMap.map((entry: any) => entry.item);

      const ids = [...currentIds];
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== newIds[i]) {
          const fromIdx = ids.indexOf(newIds[i]);
          if (fromIdx !== -1) {
            onReorder(fromIdx, i);
            const [moved] = ids.splice(fromIdx, 1);
            ids.splice(i, 0, moved);
          }
        }
      }
    });

    return () => {
      swapyRef.current?.destroy();
      swapyRef.current = null;
    };
  }, []);

  // Compute visual order for rendering, filtering out stale entries
  const slottedItems = useMemo(() => {
    const items = utils.toSlottedItems(fields, "id", slotItemMap);
    return items.filter((entry: any) => entry.item != null);
  }, [fields, slotItemMap]);

  return (
    <div ref={containerRef} className={className}>
      {slottedItems.map(({ slotId, itemId, item }: any, visualIndex: number) => (
        <div key={slotId} data-swapy-slot={slotId}>
          <div key={itemId} data-swapy-item={itemId}>
            {renderItem(item, visualIndex)}
          </div>
        </div>
      ))}
    </div>
  );
}

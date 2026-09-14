import SwiftUI
import UIKit

// MARK: - Delta Models

struct DeltaGame: Identifiable, Hashable {
    let id: String
    var name: String
    var bundleId: String
    var version: String
    var isMax: Bool
    var status: String
}

struct DeltaDeviceInfo {
    var model: String = "iPhone 16"
    var osVersion: String = "iOS 26.4"
    var isSupported: Bool = true
    var compatibilityText: String = "Có Hỗ Trợ"
}

struct DeltaKeyInfo {
    var key: String = "NGPH-7782-9901-EF92"
    var maskedKey: String = "NGPH••••EF92"
    var expireDate: String = "2026-12-31"
    var status: String = "active"
}

struct DeltaProxyFeature: Identifiable {
    let id: String
    var name: String
    var desc: String
    var systemImage: String
    var isActive: Bool
    var isVip2: Bool = false
}

struct DeltaEspFeature: Identifiable {
    let id: String
    var name: String
    var desc: String
    var systemImage: String
    var isActive: Bool
    var colorHex: String = "#00E5FF"
    var isResetAction: Bool = false
    var isColorPickable: Bool = false
}

struct DeltaModSkin: Identifiable {
    let id: String
    var name: String
    var subtitle: String
    var character: String
    var version: String
    var isCrown: Bool
    var isActive: Bool
}

// MARK: - Main ContentView

struct ContentView: View {
    @Environment(\.appLanguage) private var language
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @EnvironmentObject private var patchDraftCoordinator: PatchDraftCoordinator
    @EnvironmentObject private var patchStore: PatchProjectStore
    @EnvironmentObject private var repositoryStore: PackageRepositoryStore
    @AppStorage(FeatureVisibility.developerModeStorageKey)
    private var developerModeEnabled = false

    // Navigation & View Mode
    @State private var showClassic3105 = false
    @State private var tabNavigation: AppTabNavigationState

    // Delta State
    @State private var device = DeltaDeviceInfo()
    @State private var keyInfo = DeltaKeyInfo()
    @State private var selectedGame: DeltaGame? = nil
    @State private var activeTab: String = "proxy" // "proxy", "dinh-vi", "mod-nv"
    @State private var isDnsEnabled = true

    // Delta Proxy Features
    @State private var vipFeatures: [DeltaProxyFeature] = [
        DeltaProxyFeature(id: "p1", name: "Proxy Body (Full Đỏ Xoá Máu Vàng)", desc: "Tự động ghim tâm vào ngực, loại bỏ hiển thị máu vàng", systemImage: "bolt.fill", isActive: false),
        DeltaProxyFeature(id: "p2", name: "Proxy Cổ V1", desc: "Tối ưu đường đạn khóa vào vùng cổ mục tiêu", systemImage: "scope", isActive: false),
        DeltaProxyFeature(id: "p3", name: "Proxy Cổ V2", desc: "Phiên bản nâng cao, tăng tốc độ khóa tâm 35%", systemImage: "target", isActive: false),
        DeltaProxyFeature(id: "p4", name: "Proxy Magic (Đạn Ma Thuật)", desc: "Bẻ cong quỹ đạo đạn, tăng tỷ lệ trúng mục tiêu", systemImage: "sparkles", isActive: false),
        DeltaProxyFeature(id: "p5", name: "Proxy Drag V2 (Kéo Tâm Lên Đầu)", desc: "Hỗ trợ vuốt tâm siêu nhạy, tự hút headshot", systemImage: "flame.fill", isActive: false)
    ]

    @State private var vip2Features: [DeltaProxyFeature] = [
        DeltaProxyFeature(id: "p2-1", name: "Proxy Drag V1", desc: "Kéo tâm cơ bản, tự động bù giật khi sấy", systemImage: "flame", isActive: false, isVip2: true),
        DeltaProxyFeature(id: "p2-2", name: "Proxy Cổ Dị Tật", desc: "Khóa tâm góc dị tật, bypass hitbox phòng ngự", systemImage: "scope", isActive: false, isVip2: true),
        DeltaProxyFeature(id: "p2-3", name: "Proxy Drag V3 + Antenna", desc: "Kết hợp kéo tâm siêu tốc và cột ăng-ten định vị", systemImage: "antenna.radiowaves.left.and.right", isActive: false, isVip2: true),
        DeltaProxyFeature(id: "p2-4", name: "Proxy Cổ Dị Tật + Antenna", desc: "Góc khóa tâm cổ kết hợp cột laser trên đầu địch", systemImage: "scope", isActive: false, isVip2: true),
        DeltaProxyFeature(id: "p2-5", name: "Proxy Bụng", desc: "Khóa tâm trọng tâm cơ thể, an toàn tuyệt đối", systemImage: "shield.fill", isActive: false, isVip2: true),
        DeltaProxyFeature(id: "p2-6", name: "Proxy Bụng + Antenna", desc: "Proxy bụng kết hợp ăng-ten tầm xa 200m", systemImage: "bolt.fill", isActive: false, isVip2: true)
    ]

    // Delta ESP Features
    @State private var espFeatures: [DeltaEspFeature] = [
        DeltaEspFeature(id: "esp-reset", name: "Tắt Định Vị & Mod Skin NV", desc: "Khôi phục lại dữ liệu game gốc", systemImage: "arrow.counterclockwise", isActive: false, isResetAction: true),
        DeltaEspFeature(id: "esp-gun", name: "Định Vị Súng Màu Tự Chọn", desc: "Hiện xuyên tường vị trí súng trên bản đồ", systemImage: "eye.fill", isActive: false, colorHex: "#00E5FF", isColorPickable: true),
        DeltaEspFeature(id: "esp-player", name: "Định Vị Nhân Vật Tự Chọn", desc: "Hiện khung viền và xương nhân vật địch", systemImage: "person.fill.viewfinder", isActive: false, colorHex: "#00E5FF", isColorPickable: true),
        DeltaEspFeature(id: "esp-radar", name: "Định Vị - Hiện Vị Trí Súng & Vật Phẩm Trên Map", desc: "Radar mini hiển thị vị trí đồ họa", systemImage: "map.fill", isActive: false)
    ]

    // Delta Mod Skins
    @State private var skins: [DeltaModSkin] = [
        DeltaModSkin(id: "s-maro", name: "Mod Skin Maro", subtitle: "Maro Quỷ Dạ Xoa", character: "Maro", version: "v1.2", isCrown: true, isActive: false),
        DeltaModSkin(id: "s-alok-1", name: "Mod Skin Alok V1", subtitle: "Alok Âm Nhạc Hắc Ám", character: "Alok", version: "v1.0", isCrown: false, isActive: false),
        DeltaModSkin(id: "s-alok-2", name: "Mod Skin Alok V2", subtitle: "Alok Tia Chớp Neon", character: "Alok", version: "v1.1", isCrown: false, isActive: false),
        DeltaModSkin(id: "s-alok-3", name: "Mod Skin Alok V3", subtitle: "Alok Thần Bài Cyber", character: "Alok", version: "v1.3", isCrown: false, isActive: false),
        DeltaModSkin(id: "s-alok-4", name: "Mod Skin Alok V4", subtitle: "Alok Rồng Thần", character: "Alok", version: "v1.4", isCrown: true, isActive: false),
        DeltaModSkin(id: "s-alok-5", name: "Mod Skin Alok V5", subtitle: "Alok Chiến Binh Tối Thượng", character: "Alok", version: "v1.5", isCrown: false, isActive: false),
        DeltaModSkin(id: "s-dimitri-1", name: "Mod Skin Dimitri V1", subtitle: "Dimitri DJ Bão Lửa", character: "Dimitri", version: "v1.0", isCrown: false, isActive: false),
        DeltaModSkin(id: "s-dimitri-2", name: "Mod Skin Dimitri V2", subtitle: "Dimitri Tinh Anh Âm Hưởng", character: "Dimitri", version: "v1.1", isCrown: true, isActive: false)
    ]

    @State private var skinFilter: String = "all"

    // Modals
    @State private var showSettings = false
    @State private var showLogs = false
    @State private var showChangeKey = false
    @State private var showKeyInfo = false
    @State private var showVideoTutorial = false
    @State private var showLaunchGame = false
    @State private var colorPickerFeatureId: String? = nil
    @State private var previewSkin: DeltaModSkin? = nil
    @State private var toastMessage: String? = nil

    private let games: [DeltaGame] = [
        DeltaGame(id: "freefire-max", name: "Free Fire Max", bundleId: "com.dts.freefiremax", version: "2.108.1", isMax: true, status: "ready"),
        DeltaGame(id: "freefire-normal", name: "Free Fire", bundleId: "com.dts.freefireth", version: "1.108.1", isMax: false, status: "ready")
    ]

    init() {
        _tabNavigation = State(initialValue: AppTabNavigationState())
    }

    private var activeModsCount: Int {
        vipFeatures.filter(\.isActive).count +
        vip2Features.filter(\.isActive).count +
        espFeatures.filter(\.isActive).count +
        skins.filter(\.isActive).count
    }

    private func showToast(_ msg: String) {
        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
            toastMessage = msg
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.3) {
            withAnimation(.easeOut(duration: 0.2)) {
                if toastMessage == msg {
                    toastMessage = nil
                }
            }
        }
    }

    var body: some View {
        Group {
            if showClassic3105 {
                classic3105Layout
            } else {
                deltaLayout
            }
        }
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showSettings) {
            DeltaSettingsModal(
                device: $device,
                showClassic: $showClassic3105,
                onClearCache: { showToast("Đã giải phóng bộ nhớ đệm thành công!") }
            )
        }
        .sheet(isPresented: $showLogs) { LogView() }
        .sheet(isPresented: $showChangeKey) {
            DeltaChangeKeyModal(
                currentKey: keyInfo.key,
                onSave: { newKey in
                    let masked = String(newKey.prefix(4)) + "••••" + String(newKey.suffix(4))
                    keyInfo.key = newKey
                    keyInfo.maskedKey = masked
                    showToast("Đã kích hoạt mã Key bản quyền mới!")
                }
            )
        }
        .sheet(isPresented: $showKeyInfo) {
            DeltaKeyInfoModal(keyInfo: keyInfo, device: device)
        }
        .sheet(isPresented: $showVideoTutorial) {
            DeltaVideoTutorialModal()
        }
        .sheet(isPresented: $showLaunchGame) {
            if let game = selectedGame {
                DeltaLaunchGameModal(game: game, activeModsCount: activeModsCount, isDnsEnabled: isDnsEnabled)
            }
        }
        .sheet(item: $previewSkin) { skin in
            DeltaSkinPreviewModal(
                skin: skin,
                onToggle: { id in
                    toggleSkin(id: id)
                }
            )
        }
        .sheet(isPresented: Binding(
            get: { colorPickerFeatureId != nil },
            set: { if !$0 { colorPickerFeatureId = nil } }
        )) {
            if let fId = colorPickerFeatureId,
               let feature = espFeatures.first(where: { $0.id == fId }) {
                DeltaColorPickerModal(
                    title: feature.name,
                    currentColorHex: feature.colorHex,
                    onSelect: { hex in
                        if let idx = espFeatures.firstIndex(where: { $0.id == fId }) {
                            espFeatures[idx].colorHex = hex
                            espFeatures[idx].isActive = true
                            showToast("Đã cập nhật màu hiển thị mới!")
                        }
                    }
                )
            }
        }
        .patchStorePresentation(patchStore)
        .repositoryStorePresentation(repositoryStore, patchStore: patchStore)
    }

    // MARK: - Delta IPA VN Main Layout

    private var deltaLayout: some View {
        ZStack {
            DeltaTheme.bg.ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                deltaHeader

                // Body content
                ScrollView(showsIndicators: false) {
                    VStack(spacing: 16) {
                        if let game = selectedGame {
                            deltaGameDetailView(game: game)
                        } else {
                            deltaDashboardView
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, selectedGame != nil ? 96 : 32)
                }
            }

            // Floating Bottom Bar for MỞ GAME (When in Game Detail)
            if selectedGame != nil {
                VStack {
                    Spacer()
                    Button {
                        showLaunchGame = true
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "play.fill")
                                .font(.system(size: 15, weight: .black))
                            Text("MỞ GAME")
                                .font(.system(size: 15, weight: .black))
                                .tracking(1.5)

                            if activeModsCount > 0 {
                                Text("(\(activeModsCount) MOD)")
                                    .font(.system(size: 11, weight: .black))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 2)
                                    .background(Color.black.opacity(0.25))
                                    .clipShape(Capsule())
                            }
                        }
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity)
                        .frame(height: 52)
                        .background(
                            LinearGradient(
                                colors: [DeltaTheme.cyan, Color(red: 56/255.0, green: 189/255.0, blue: 248/255.0)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .stroke(Color.white.opacity(0.3), lineWidth: 1)
                        )
                        .shadow(color: DeltaTheme.cyan.opacity(0.5), radius: 16, y: 4)
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 16)
                    .background(
                        LinearGradient(
                            colors: [Color.black.opacity(0.95), Color.clear],
                            startPoint: .bottom,
                            endPoint: .top
                        )
                        .frame(height: 100)
                        .allowsHitTesting(false)
                    )
                }
            }

            // Top Floating Toast
            if let toast = toastMessage {
                VStack {
                    HStack(spacing: 8) {
                        Circle()
                            .fill(DeltaTheme.cyan)
                            .frame(width: 8, height: 8)
                            .shadow(color: DeltaTheme.cyan, radius: 4)
                        Text(toast)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(DeltaTheme.cardBg.opacity(0.95))
                    .clipShape(Capsule())
                    .overlay(Capsule().stroke(DeltaTheme.cyan.opacity(0.6), lineWidth: 1))
                    .shadow(color: Color.black.opacity(0.4), radius: 10, y: 5)
                    .padding(.top, 12)
                    .transition(.move(edge: .top).combined(with: .opacity))

                    Spacer()
                }
                .zIndex(100)
            }
        }
    }

    // MARK: - Delta Header

    private var deltaHeader: some View {
        HStack {
            if let _ = selectedGame {
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        selectedGame = nil
                    }
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 14, weight: .bold))
                        Text("Quay lại")
                            .font(.system(size: 13, weight: .semibold))
                    }
                    .foregroundColor(DeltaTheme.cyan)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(DeltaTheme.cardBg)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(DeltaTheme.cardBorder, lineWidth: 1))
                }
            }

            HStack(spacing: 8) {
                Text("DELTA IPA VN")
                    .font(.system(size: 17, weight: .black))
                    .foregroundColor(.white)
                    .tracking(0.5)

                Text("v1.5.0")
                    .font(.system(size: 10, weight: .black))
                    .foregroundColor(DeltaTheme.cyan)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(DeltaTheme.cyanDark)
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                    .overlay(RoundedRectangle(cornerRadius: 6).stroke(DeltaTheme.cyan.opacity(0.3), lineWidth: 1))
            }

            Spacer()

            Button {
                showSettings = true
            } label: {
                Image(systemName: "gearshape.fill")
                    .font(.system(size: 15, weight: .bold))
                    .foregroundColor(DeltaTheme.textSecondary)
                    .frame(width: 36, height: 36)
                    .background(DeltaTheme.cardBg)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(DeltaTheme.cardBorder, lineWidth: 1))
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(DeltaTheme.bg)
        .overlay(
            Divider().background(DeltaTheme.cardBorder),
            alignment: .bottom
        )
    }

    // MARK: - Dashboard View (Matches Preview Screen 1)

    private var deltaDashboardView: some View {
        VStack(spacing: 16) {
            // 3-Column Device Info Card
            deviceInfoCard

            // Apps Section Header
            HStack {
                Text("ỨNG DỤNG (\(games.count))")
                    .font(.system(size: 12, weight: .black))
                    .foregroundColor(DeltaTheme.textSecondary)
                    .tracking(1)
                Spacer()
            }
            .padding(.horizontal, 4)

            // Games List
            VStack(spacing: 12) {
                ForEach(games) { game in
                    gameCardView(game: game)
                }
            }

            Spacer().frame(height: 20)

            // Announcement Bar
            HStack(spacing: 10) {
                Image(systemName: "megaphone.fill")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(DeltaTheme.amber)
                    .padding(8)
                    .background(DeltaTheme.amber.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 8))

                Text("Delta VN Mãi Chất, Em Yêu Delta <3")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(.white)

                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))

            // Key Bar
            HStack(spacing: 10) {
                Image(systemName: "key.fill")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(DeltaTheme.cyan)

                Button {
                    showKeyInfo = true
                } label: {
                    HStack(spacing: 4) {
                        Text("KEY:")
                            .font(.system(size: 12, weight: .black))
                            .foregroundColor(DeltaTheme.textSecondary)
                        Text(keyInfo.maskedKey)
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(.white)
                    }
                }

                Button {
                    UIPasteboard.general.string = keyInfo.key
                    showToast("Đã sao chép Key vào khay nhớ tạm!")
                } label: {
                    Image(systemName: "doc.on.doc")
                        .font(.system(size: 12))
                        .foregroundColor(DeltaTheme.cyan)
                }

                Spacer()

                Button {
                    showChangeKey = true
                } label: {
                    Text("Đổi Key")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(.black)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(DeltaTheme.cyan)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))
        }
    }

    private var deviceInfoCard: some View {
        Button {
            showSettings = true
        } label: {
            HStack(spacing: 0) {
                // Column 1: Device
                VStack(alignment: .leading, spacing: 4) {
                    Text("THIẾT BỊ")
                        .font(.system(size: 10, weight: .black))
                        .foregroundColor(DeltaTheme.textSecondary)
                    Text(device.model)
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(.white)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                Divider().background(DeltaTheme.cardBorder).frame(height: 32)

                // Column 2: OS
                VStack(alignment: .leading, spacing: 4) {
                    Text("HỆ ĐIỀU HÀNH")
                        .font(.system(size: 10, weight: .black))
                        .foregroundColor(DeltaTheme.textSecondary)
                    Text(device.osVersion)
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(.white)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 12)

                Divider().background(DeltaTheme.cardBorder).frame(height: 32)

                // Column 3: Compatibility
                VStack(alignment: .leading, spacing: 4) {
                    Text("TƯƠNG THÍCH")
                        .font(.system(size: 10, weight: .black))
                        .foregroundColor(DeltaTheme.textSecondary)
                    HStack(spacing: 5) {
                        Circle()
                            .fill(DeltaTheme.green)
                            .frame(width: 7, height: 7)
                            .shadow(color: DeltaTheme.green, radius: 4)
                        Text(device.compatibilityText)
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(DeltaTheme.green)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 12)
            }
            .padding(16)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 20))
            .overlay(RoundedRectangle(cornerRadius: 20).stroke(DeltaTheme.cardBorder, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    private func gameCardView(game: DeltaGame) -> some View {
        Button {
            withAnimation(.easeInOut(duration: 0.2)) {
                selectedGame = game
            }
        } label: {
            HStack(spacing: 12) {
                // Game Icon
                ZStack {
                    LinearGradient(
                        colors: game.isMax ? [Color(red: 234/255.0, green: 88/255.0, blue: 12/255.0), Color(red: 185/255.0, green: 28/255.0, blue: 28/255.0)]
                                           : [Color(red: 14/255.0, green: 116/255.0, blue: 144/255.0), Color(red: 3/255.0, green: 105/255.0, blue: 161/255.0)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                    VStack(spacing: 2) {
                        Image(systemName: "flame.fill")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                        if game.isMax {
                            Text("MAX")
                                .font(.system(size: 8, weight: .black))
                                .foregroundColor(.yellow)
                        }
                    }
                }
                .frame(width: 48, height: 48)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.white.opacity(0.2), lineWidth: 1))

                // Info
                VStack(alignment: .leading, spacing: 3) {
                    Text(game.name)
                        .font(.system(size: 15, weight: .bold))
                        .foregroundColor(.white)
                    Text(game.bundleId)
                        .font(.system(size: 11, weight: .medium, design: .monospaced))
                        .foregroundColor(DeltaTheme.textSecondary)
                }

                Spacer()

                // Ready Badge
                HStack(spacing: 4) {
                    Text("READY")
                        .font(.system(size: 11, weight: .black))
                    Image(systemName: "chevron.right")
                        .font(.system(size: 10, weight: .black))
                }
                .foregroundColor(DeltaTheme.cyan)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(DeltaTheme.cyanDark)
                .clipShape(RoundedRectangle(cornerRadius: 8))
                .overlay(RoundedRectangle(cornerRadius: 8).stroke(DeltaTheme.cyan.opacity(0.4), lineWidth: 1))
            }
            .padding(14)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 18))
            .overlay(RoundedRectangle(cornerRadius: 18).stroke(DeltaTheme.cardBorder, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    // MARK: - Game Detail View (Matches Preview Screen 2 & 3)

    private func deltaGameDetailView(game: DeltaGame) -> some View {
        VStack(spacing: 14) {
            // Top Bar: Game info
            HStack {
                ZStack {
                    RoundedRectangle(cornerRadius: 10)
                        .fill(game.isMax ? Color.orange : Color.cyan)
                    Image(systemName: "flame.fill")
                        .foregroundColor(.white)
                        .font(.system(size: 16))
                }
                .frame(width: 40, height: 40)

                VStack(alignment: .leading, spacing: 2) {
                    Text(game.name)
                        .font(.system(size: 16, weight: .black))
                        .foregroundColor(.white)
                    HStack(spacing: 6) {
                        Text(game.bundleId)
                            .font(.system(size: 11, design: .monospaced))
                            .foregroundColor(DeltaTheme.textSecondary)
                        HStack(spacing: 3) {
                            Circle().fill(DeltaTheme.green).frame(width: 6, height: 6)
                            Text("ONLINE")
                                .font(.system(size: 9, weight: .black))
                                .foregroundColor(DeltaTheme.green)
                        }
                    }
                }

                Spacer()

                Button {
                    withAnimation { selectedGame = nil }
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.left")
                            .font(.system(size: 11, weight: .bold))
                        Text("Đổi Game")
                            .font(.system(size: 11, weight: .bold))
                    }
                    .foregroundColor(DeltaTheme.cyan)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(DeltaTheme.cardBg)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(DeltaTheme.cardBorder, lineWidth: 1))
                }
            }
            .padding(12)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))

            // 3-Segmented Tabs: Proxy | Định Vị | Mod NV
            HStack(spacing: 0) {
                tabButton(id: "proxy", title: "Proxy", icon: "bolt.fill")
                tabButton(id: "dinh-vi", title: "Định Vị", icon: "location.north.fill")
                tabButton(id: "mod-nv", title: "Mod NV", icon: "person.crop.circle.badge.checkmark")
            }
            .padding(4)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))

            // DNS Antiband 4.0 Card
            if activeTab != "mod-nv" {
                dnsAntibandCard
            }

            // Tab Content
            if activeTab == "proxy" {
                proxyTabView
            } else if activeTab == "dinh-vi" {
                espTabView
            } else {
                skinTabView
            }
        }
    }

    private func tabButton(id: String, title: String, icon: String) -> some View {
        Button {
            withAnimation(.easeInOut(duration: 0.15)) {
                activeTab = id
            }
        } label: {
            HStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.system(size: 12, weight: .bold))
                Text(title)
                    .font(.system(size: 13, weight: .bold))
            }
            .foregroundColor(activeTab == id ? DeltaTheme.cyan : DeltaTheme.textSecondary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 10)
            .background(activeTab == id ? DeltaTheme.cyanDark : Color.clear)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                activeTab == id ?
                RoundedRectangle(cornerRadius: 12).stroke(DeltaTheme.cyan.opacity(0.3), lineWidth: 1) : nil
            )
        }
    }

    // MARK: - DNS Antiband Card

    private var dnsAntibandCard: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(isDnsEnabled ? DeltaTheme.green.opacity(0.2) : Color.stoneBackground)
                    .frame(width: 44, height: 44)
                Image(systemName: "shield.checkered")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(isDnsEnabled ? DeltaTheme.green : DeltaTheme.textSecondary)
            }

            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 6) {
                    Text("DNS ANTIBAND 4.0")
                        .font(.system(size: 13, weight: .black))
                        .foregroundColor(.white)
                    Text("DoH")
                        .font(.system(size: 9, weight: .black))
                        .foregroundColor(DeltaTheme.cyan)
                        .padding(.horizontal, 5)
                        .padding(.vertical, 1)
                        .background(DeltaTheme.cyanDark)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                }

                Text("DNS-over-HTTPS · Mã hóa chống khoá")
                    .font(.system(size: 11))
                    .foregroundColor(DeltaTheme.textSecondary)

                Text(isDnsEnabled ? "Đã bật · Bảo vệ trực tiếp qua NextDNS" : "Đang dùng DNS mặc định")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(isDnsEnabled ? DeltaTheme.green : Color.orange)
            }

            Spacer()

            Button {
                isDnsEnabled.toggle()
                showToast(isDnsEnabled ? "Đã bật DNS Antiband 4.0 chống quét!" : "Đã tắt DNS Antiband")
            } label: {
                ZStack {
                    Circle()
                        .fill(isDnsEnabled ? DeltaTheme.cyan : DeltaTheme.cardBorder)
                        .frame(width: 36, height: 36)
                        .shadow(color: isDnsEnabled ? DeltaTheme.cyan.opacity(0.6) : Color.clear, radius: 8)
                    Image(systemName: "power")
                        .font(.system(size: 15, weight: .bold))
                        .foregroundColor(isDnsEnabled ? .black : DeltaTheme.textSecondary)
                }
            }
        }
        .padding(14)
        .background(DeltaTheme.cardBg)
        .clipShape(RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(DeltaTheme.cardBorder, lineWidth: 1))
    }

    // MARK: - Proxy Tab View

    private var proxyTabView: some View {
        VStack(spacing: 16) {
            // Section 1: PROXY DELTA VIP (AUTO)
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    HStack(spacing: 6) {
                        Capsule().fill(DeltaTheme.cyan).frame(width: 3, height: 14)
                        Text("PROXY DELTA VIP")
                            .font(.system(size: 13, weight: .black))
                            .foregroundColor(.white)
                    }
                    Spacer()
                    Text("AUTO")
                        .font(.system(size: 9, weight: .black))
                        .foregroundColor(DeltaTheme.cyan)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(DeltaTheme.cyanDark)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                }

                // Video Tutorial Banner
                videoBannerView

                // 2-Column Grid
                LazyVGrid(columns: [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)], spacing: 10) {
                    ForEach(vipFeatures) { feat in
                        proxyFeatureCard(feat: feat) {
                            toggleProxy(feat.id)
                        }
                    }
                }
            }

            // Section 2: PROXY DELTA VIP V2 (V2)
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    HStack(spacing: 6) {
                        Capsule().fill(DeltaTheme.cyan).frame(width: 3, height: 14)
                        Text("PROXY DELTA VIP V2")
                            .font(.system(size: 13, weight: .black))
                            .foregroundColor(.white)
                    }
                    Spacer()
                    Text("V2")
                        .font(.system(size: 9, weight: .black))
                        .foregroundColor(DeltaTheme.cyan)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(DeltaTheme.cyanDark)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                }

                // Video Tutorial Banner
                videoBannerView

                // 2-Column Grid
                LazyVGrid(columns: [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)], spacing: 10) {
                    ForEach(vip2Features) { feat in
                        proxyFeatureCard(feat: feat) {
                            toggleProxy(feat.id)
                        }
                    }
                }
            }

            // Footer Notice
            HStack {
                Spacer()
                Text("Đã Sẵn Sàng - Bạn Đã Có Thể Bắt Đầu Kích Hoạt Proxy")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(DeltaTheme.textSecondary)
                Spacer()
            }
            .padding(.vertical, 10)
            .background(DeltaTheme.innerBg)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(DeltaTheme.cardBorder, lineWidth: 1))
        }
    }

    private var videoBannerView: some View {
        Button {
            showVideoTutorial = true
        } label: {
            HStack(spacing: 12) {
                ZStack {
                    Circle().fill(Color.red.opacity(0.2)).frame(width: 36, height: 36)
                    Image(systemName: "play.fill")
                        .font(.system(size: 13, weight: .black))
                        .foregroundColor(.red)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text("Xem Video Hướng Dẫn")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(.white)
                    Text("Hướng dẫn cài đặt & bật Proxy chi tiết")
                        .font(.system(size: 10))
                        .foregroundColor(DeltaTheme.textSecondary)
                }

                Spacer()

                Text("XEM NGAY")
                    .font(.system(size: 10, weight: .black))
                    .foregroundColor(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color.red.opacity(0.8))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
            }
            .padding(10)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(RoundedRectangle(cornerRadius: 14).stroke(DeltaTheme.cardBorder, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    private func proxyFeatureCard(feat: DeltaProxyFeature, onToggle: @escaping () -> Void) -> some View {
        Button(action: onToggle) {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    ZStack {
                        Circle()
                            .fill(feat.isActive ? DeltaTheme.cyanDark : DeltaTheme.innerBg)
                            .frame(width: 28, height: 28)
                        Image(systemName: feat.systemImage)
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(feat.isActive ? DeltaTheme.cyan : DeltaTheme.textSecondary)
                    }

                    Spacer()

                    // Toggle switch simulation
                    ZStack {
                        Capsule()
                            .fill(feat.isActive ? DeltaTheme.cyan : DeltaTheme.cardBorder)
                            .frame(width: 36, height: 20)
                        Circle()
                            .fill(feat.isActive ? Color.black : Color.white)
                            .frame(width: 14, height: 14)
                            .offset(x: feat.isActive ? 8 : -8)
                    }
                }

                Text(feat.name)
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(.white)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
                    .frame(height: 32, alignment: .topLeading)

                Text(feat.desc)
                    .font(.system(size: 10))
                    .foregroundColor(DeltaTheme.textSecondary)
                    .lineLimit(2)
                    .frame(height: 26, alignment: .topLeading)
            }
            .padding(12)
            .background(DeltaTheme.cardBg)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(feat.isActive ? DeltaTheme.cyan.opacity(0.6) : DeltaTheme.cardBorder, lineWidth: 1)
            )
            .shadow(color: feat.isActive ? DeltaTheme.cyan.opacity(0.15) : Color.clear, radius: 8)
        }
        .buttonStyle(.plain)
    }

    private func toggleProxy(_ id: String) {
        if let idx = vipFeatures.firstIndex(where: { $0.id == id }) {
            vipFeatures[idx].isActive.toggle()
            let state = vipFeatures[idx].isActive
            showToast(state ? "Đã kích hoạt: \(vipFeatures[idx].name)" : "Đã tắt: \(vipFeatures[idx].name)")
            return
        }
        if let idx = vip2Features.firstIndex(where: { $0.id == id }) {
            vip2Features[idx].isActive.toggle()
            let state = vip2Features[idx].isActive
            showToast(state ? "Đã kích hoạt: \(vip2Features[idx].name)" : "Đã tắt: \(vip2Features[idx].name)")
        }
    }

    // MARK: - ESP Tab View

    private var espTabView: some View {
        VStack(spacing: 12) {
            // Header
            HStack {
                HStack(spacing: 6) {
                    Capsule().fill(DeltaTheme.cyan).frame(width: 3, height: 14)
                    Text("ĐỊNH VỊ (ESP & X-RAY)")
                        .font(.system(size: 13, weight: .black))
                        .foregroundColor(.white)
                }
                Spacer()
                Text("LIVE")
                    .font(.system(size: 9, weight: .black))
                    .foregroundColor(.white)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Color.red)
                    .clipShape(RoundedRectangle(cornerRadius: 4))
            }

            // Quick Reset Button
            Button {
                for i in 0..<espFeatures.count { espFeatures[i].isActive = false }
                for i in 0..<skins.count { skins[i].isActive = false }
                showToast("Đã khôi phục gốc: Tắt toàn bộ Định vị & Mod Skin")
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "arrow.counterclockwise")
                        .font(.system(size: 12, weight: .bold))
                    Text("Tắt Định Vị & Mod Skin NV (Khôi Phục Gốc)")
                        .font(.system(size: 12, weight: .bold))
                }
                .foregroundColor(.red)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 10)
                .background(Color.red.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.red.opacity(0.3), lineWidth: 1))
            }

            // Feature Cards
            ForEach(espFeatures.filter { !$0.isResetAction }) { feat in
                espFeatureRow(feat: feat)
            }
        }
    }

    private func espFeatureRow(feat: DeltaEspFeature) -> some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(feat.isActive ? DeltaTheme.cyanDark : DeltaTheme.innerBg)
                    .frame(width: 36, height: 36)
                Image(systemName: feat.systemImage)
                    .font(.system(size: 15, weight: .bold))
                    .foregroundColor(feat.isActive ? DeltaTheme.cyan : DeltaTheme.textSecondary)
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(feat.name)
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(.white)
                Text(feat.desc)
                    .font(.system(size: 11))
                    .foregroundColor(DeltaTheme.textSecondary)
            }

            Spacer()

            if feat.isColorPickable {
                Button {
                    colorPickerFeatureId = feat.id
                } label: {
                    Circle()
                        .fill(Color(hex: feat.colorHex))
                        .frame(width: 24, height: 24)
                        .overlay(Circle().stroke(Color.white.opacity(0.8), lineWidth: 1.5))
                        .shadow(color: Color(hex: feat.colorHex).opacity(0.8), radius: 6)
                }
            }

            Button {
                if let idx = espFeatures.firstIndex(where: { $0.id == feat.id }) {
                    espFeatures[idx].isActive.toggle()
                    showToast(espFeatures[idx].isActive ? "Đã bật: \(feat.name)" : "Đã tắt: \(feat.name)")
                }
            } label: {
                ZStack {
                    Capsule()
                        .fill(feat.isActive ? DeltaTheme.cyan : DeltaTheme.cardBorder)
                        .frame(width: 40, height: 22)
                    Circle()
                        .fill(feat.isActive ? Color.black : Color.white)
                        .frame(width: 16, height: 16)
                        .offset(x: feat.isActive ? 9 : -9)
                }
            }
        }
        .padding(14)
        .background(DeltaTheme.cardBg)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))
    }

    // MARK: - Skin Tab View

    private var skinTabView: some View {
        VStack(spacing: 12) {
            // Header
            HStack {
                HStack(spacing: 6) {
                    Capsule().fill(DeltaTheme.cyan).frame(width: 3, height: 14)
                    Text("MOD NGOẠI TRANG NHÂN VẬT")
                        .font(.system(size: 13, weight: .black))
                        .foregroundColor(.white)
                }
                Spacer()
                Text("\(skins.filter(\.isActive).count) ĐANG DÙNG")
                    .font(.system(size: 9, weight: .black))
                    .foregroundColor(DeltaTheme.cyan)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(DeltaTheme.cyanDark)
                    .clipShape(RoundedRectangle(cornerRadius: 4))
            }

            // Filter Pills
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(["all", "Alok", "Maro", "Dimitri"], id: \.self) { c in
                        Button {
                            skinFilter = c
                        } label: {
                            Text(c == "all" ? "Tất cả" : c)
                                .font(.system(size: 11, weight: .bold))
                                .foregroundColor(skinFilter == c ? .black : DeltaTheme.textSecondary)
                                .padding(.horizontal, 14)
                                .padding(.vertical, 6)
                                .background(skinFilter == c ? DeltaTheme.cyan : DeltaTheme.cardBg)
                                .clipShape(Capsule())
                                .overlay(Capsule().stroke(skinFilter == c ? DeltaTheme.cyan : DeltaTheme.cardBorder, lineWidth: 1))
                        }
                    }
                }
            }

            // 2-Column Grid
            let filtered = skins.filter {
                skinFilter == "all" || $0.character.lowercased() == skinFilter.lowercased()
            }

            LazyVGrid(columns: [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)], spacing: 10) {
                ForEach(filtered) { skin in
                    skinCardView(skin: skin)
                }
            }
        }
    }

    private func skinCardView(skin: DeltaModSkin) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(DeltaTheme.innerBg)
                        .frame(width: 28, height: 28)
                    Image(systemName: skin.isCrown ? "crown.fill" : "person.fill")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(skin.isCrown ? DeltaTheme.amber : DeltaTheme.cyan)
                }

                Spacer()

                Button {
                    previewSkin = skin
                } label: {
                    Image(systemName: "eye.fill")
                        .font(.system(size: 12))
                        .foregroundColor(DeltaTheme.textSecondary)
                        .padding(4)
                        .background(DeltaTheme.innerBg)
                        .clipShape(Circle())
                }
            }

            Text(skin.name)
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(.white)
                .lineLimit(1)

            Text(skin.subtitle)
                .font(.system(size: 10))
                .foregroundColor(DeltaTheme.textSecondary)
                .lineLimit(1)

            Button {
                toggleSkin(id: skin.id)
            } label: {
                Text(skin.isActive ? "ĐANG DÙNG" : "KÍCH HOẠT")
                    .font(.system(size: 10, weight: .black))
                    .foregroundColor(skin.isActive ? .white : .black)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 6)
                    .background(skin.isActive ? Color.red.opacity(0.8) : DeltaTheme.cyan)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }
        }
        .padding(12)
        .background(DeltaTheme.cardBg)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(skin.isActive ? DeltaTheme.cyan.opacity(0.6) : DeltaTheme.cardBorder, lineWidth: 1)
        )
    }

    private func toggleSkin(id: String) {
        if let idx = skins.firstIndex(where: { $0.id == id }) {
            skins[idx].isActive.toggle()
            showToast(skins[idx].isActive ? "Đã trang bị \(skins[idx].name)" : "Đã tháo \(skins[idx].name)")
        }
    }

    // MARK: - Classic 3105 Layout (Fallback)

    private var classic3105Layout: some View {
        Group {
            if horizontalSizeClass == .regular {
                classicRegularLayout
            } else {
                classicCompactLayout
            }
        }
        .tint(AppTheme.accent)
        .imageScale(.small)
    }

    private var classicCompactLayout: some View {
        TabView(selection: tabSelection) {
            ForEach(featureVisibility.visibleSections) { section in
                classicSectionContent(section)
                    .tabItem {
                        Label(language.text(section.titleKey), systemImage: section.systemImage)
                    }
                    .tag(section.rawValue)
            }
        }
    }

    private var classicRegularLayout: some View {
        NavigationSplitView {
            List {
                Button {
                    showClassic3105 = false
                } label: {
                    Label("Về Delta IPA VN", systemImage: "arrow.uturn.backward")
                        .foregroundColor(DeltaTheme.cyan)
                }

                ForEach(featureVisibility.visibleSections) { section in
                    Button {
                        tabNavigation.select(section.rawValue)
                    } label: {
                        Label(language.text(section.titleKey), systemImage: section.systemImage)
                            .fontWeight(section.rawValue == tabNavigation.selectedTab ? .semibold : .regular)
                    }
                }
            }
            .navigationTitle("3105")
        } detail: {
            classicSectionContent(selectedVisibleSection)
        }
    }

    @ViewBuilder
    private func classicSectionContent(_ section: AppSection) -> some View {
        switch section {
        case .home:
            RepositoryHomeView(onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        case .new:
            RepositoryNewView(onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        case .sources:
            RepositorySourcesView(onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        case .installed:
            PatchProjectsView(onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        case .files:
            AppDataBrowserView(tabSession: filesTabSession, onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        case .search:
            RepositorySearchView(onOpenSettings: { showSettings = true }, onOpenLogs: { showLogs = true })
        }
    }

    private var tabSelection: Binding<Int> {
        Binding(
            get: { tabNavigation.selectedTab },
            set: { tabNavigation.select($0) }
        )
    }

    private var filesTabSession: Binding<FilesTabSession> {
        Binding(
            get: { tabNavigation.filesTabs },
            set: { tabNavigation.setFilesTabs($0) }
        )
    }

    private var featureVisibility: FeatureVisibility {
        FeatureVisibility(developerModeEnabled: developerModeEnabled)
    }

    private var selectedVisibleSection: AppSection {
        let selected = AppSection(rawValue: tabNavigation.selectedTab)
        return selected.flatMap {
            featureVisibility.isVisible($0) ? $0 : nil
        } ?? .home
    }
}

// MARK: - Color Extension for Hex

extension Color {
    static let stoneBackground = Color(red: 28/255.0, green: 35/255.0, blue: 48/255.0)

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 229, 255)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Modals (Settings, Launch Game, Video Tutorial, Change Key, Key Info, Color Picker, Skin Preview)

struct DeltaSettingsModal: View {
    @Binding var device: DeltaDeviceInfo
    @Binding var showClassic: Bool
    var onClearCache: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Device Spoofing
                    VStack(alignment: .leading, spacing: 10) {
                        Text("THÔNG TIN THIẾT BỊ GIẢ LẬP")
                            .font(.system(size: 11, weight: .black))
                            .foregroundColor(DeltaTheme.cyan)

                        VStack(spacing: 12) {
                            HStack {
                                Text("Mẫu máy")
                                    .font(.system(size: 13))
                                    .foregroundColor(DeltaTheme.textSecondary)
                                Spacer()
                                TextField("Model", text: $device.model)
                                    .font(.system(size: 13, weight: .bold))
                                    .multilineTextAlignment(.trailing)
                                    .frame(width: 140)
                            }
                            Divider().background(DeltaTheme.cardBorder)
                            HStack {
                                Text("Hệ điều hành")
                                    .font(.system(size: 13))
                                    .foregroundColor(DeltaTheme.textSecondary)
                                Spacer()
                                TextField("OS", text: $device.osVersion)
                                    .font(.system(size: 13, weight: .bold))
                                    .multilineTextAlignment(.trailing)
                                    .frame(width: 140)
                            }
                        }
                        .padding(14)
                        .background(DeltaTheme.cardBg)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))
                    }

                    // DNS Provider
                    VStack(alignment: .leading, spacing: 10) {
                        Text("MÁY CHỦ BẢO VỆ DNS")
                            .font(.system(size: 11, weight: .black))
                            .foregroundColor(DeltaTheme.cyan)

                        VStack(spacing: 8) {
                            dnsRow(title: "NextDNS Antiband 4.0 (Đề xuất)", ping: "12ms", isSelected: true)
                            dnsRow(title: "Cloudflare 1.1.1.1 Anti-RST", ping: "18ms", isSelected: false)
                            dnsRow(title: "AdGuard Gaming Protection", ping: "24ms", isSelected: false)
                        }
                    }

                    // Cache Cleaner
                    VStack(alignment: .leading, spacing: 10) {
                        Text("BẢO TRÌ BỘ NHỚ")
                            .font(.system(size: 11, weight: .black))
                            .foregroundColor(DeltaTheme.textSecondary)

                        Button {
                            onClearCache()
                        } label: {
                            HStack {
                                Image(systemName: "trash.fill")
                                    .foregroundColor(.red)
                                Text("Dọn dẹp cache & reset Hook dylib")
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(.white)
                                Spacer()
                                Text("24.8 MB")
                                    .font(.system(size: 12, design: .monospaced))
                                    .foregroundColor(DeltaTheme.textSecondary)
                            }
                            .padding(14)
                            .background(DeltaTheme.cardBg)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))
                        }
                    }

                    // Switch to 3105 Package Manager
                    Button {
                        showClassic.toggle()
                        dismiss()
                    } label: {
                        HStack {
                            Image(systemName: "square.stack.3d.up.fill")
                                .foregroundColor(DeltaTheme.cyan)
                            Text(showClassic ? "Quay lại giao diện Delta IPA" : "Mở trình quản lý 3105 cổ điển")
                                .font(.system(size: 13, weight: .bold))
                                .foregroundColor(.white)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12))
                                .foregroundColor(DeltaTheme.textSecondary)
                        }
                        .padding(14)
                        .background(DeltaTheme.cyanDark)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cyan.opacity(0.3), lineWidth: 1))
                    }

                    Text("Delta IPA VN Build 2026.9 · Phiên bản v1.5.0")
                        .font(.system(size: 11))
                        .foregroundColor(DeltaTheme.textSecondary)
                        .padding(.top, 8)
                }
                .padding(16)
            }
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Cài Đặt Delta")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
        }
    }

    private func dnsRow(title: String, ping: String, isSelected: Bool) -> some View {
        HStack {
            Text(title)
                .font(.system(size: 13, weight: isSelected ? .bold : .regular))
                .foregroundColor(isSelected ? DeltaTheme.cyan : .white)
            Spacer()
            Text(ping)
                .font(.system(size: 11, design: .monospaced))
                .foregroundColor(DeltaTheme.textSecondary)
        }
        .padding(12)
        .background(isSelected ? DeltaTheme.cyanDark : DeltaTheme.cardBg)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(isSelected ? DeltaTheme.cyan.opacity(0.5) : DeltaTheme.cardBorder, lineWidth: 1))
    }
}

struct DeltaLaunchGameModal: View {
    let game: DeltaGame
    let activeModsCount: Int
    let isDnsEnabled: Bool
    @Environment(\.dismiss) private var dismiss
    @State private var progress: Double = 0.2
    @State private var stage: String = "injecting" // "injecting" or "ready"
    @State private var logs: [String] = []

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // Progress Wheel / Icon
                ZStack {
                    Circle()
                        .stroke(DeltaTheme.cardBorder, lineWidth: 6)
                        .frame(width: 80, height: 80)
                    Circle()
                        .trim(from: 0, to: progress)
                        .stroke(DeltaTheme.cyan, style: StrokeStyle(lineWidth: 6, lineCap: .round))
                        .frame(width: 80, height: 80)
                        .rotationEffect(.degrees(-90))

                    if stage == "ready" {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 38, weight: .bold))
                            .foregroundColor(DeltaTheme.cyan)
                    } else {
                        Image(systemName: "cpu.fill")
                            .font(.system(size: 30))
                            .foregroundColor(DeltaTheme.cyan)
                    }
                }
                .padding(.top, 24)

                VStack(spacing: 4) {
                    Text(stage == "injecting" ? "Đang nạp cấu hình Proxy..." : "Đã sẵn sàng chiến game!")
                        .font(.system(size: 16, weight: .black))
                        .foregroundColor(.white)
                    Text(stage == "injecting" ? "Vui lòng không thoát ứng dụng trong quá trình nạp" : "Đã nạp thành công \(activeModsCount) cấu hình vào \(game.name)")
                        .font(.system(size: 12))
                        .foregroundColor(DeltaTheme.textSecondary)
                }

                // Terminal Logs
                ScrollView {
                    VStack(alignment: .leading, spacing: 6) {
                        ForEach(Array(logs.enumerated()), id: \.offset) { _, log in
                            HStack(alignment: .top, spacing: 6) {
                                Text(">")
                                    .font(.system(size: 11, weight: .bold, design: .monospaced))
                                    .foregroundColor(DeltaTheme.cyan)
                                Text(log)
                                    .font(.system(size: 11, design: .monospaced))
                                    .foregroundColor(log.contains("HỢP LỆ") || log.contains("BẢO VỆ") ? DeltaTheme.green : .white)
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                }
                .frame(height: 150)
                .background(DeltaTheme.innerBg)
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .overlay(RoundedRectangle(cornerRadius: 14).stroke(DeltaTheme.cardBorder, lineWidth: 1))

                Spacer()

                if stage == "ready" {
                    Button {
                        dismiss()
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "play.fill")
                            Text("MỞ GAME NGAY BÂY GIỜ")
                        }
                        .font(.system(size: 14, weight: .black))
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(DeltaTheme.cyan)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .shadow(color: DeltaTheme.cyan.opacity(0.5), radius: 10)
                    }
                    .padding(.bottom, 16)
                }
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Khởi Động \(game.name)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
            .onAppear {
                runInjectionLogs()
            }
        }
    }

    private func runInjectionLogs() {
        let lines = [
            "Khởi tạo Delta Dylib Injector v1.5.0...",
            "Xác thực mã bản quyền thiết bị: HỢP LỆ",
            isDnsEnabled ? "DNS Antiband 4.0: ĐÃ BẢO VỆ (DoH Active)" : "Cảnh báo: DNS Antiband chưa kích hoạt",
            "Đang vá bộ nhớ: \(activeModsCount) tính năng được nạp",
            "Nạp Hook vào tiến trình: \(game.bundleId)",
            "Tiến trình sẵn sàng. Đang khởi chạy Free Fire..."
        ]

        for (index, line) in lines.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(index) * 0.4) {
                logs.append(line)
                progress = min(1.0, Double(index + 1) / Double(lines.count))
                if index == lines.count - 1 {
                    stage = "ready"
                }
            }
        }
    }
}

struct DeltaVideoTutorialModal: View {
    @Environment(\.dismiss) private var dismiss
    @State private var currentStep = 1

    private let steps = [
        (step: 1, title: "Bật DNS Antiband 4.0", desc: "Nhấn nút nguồn để kích hoạt hồ sơ DNS NextDNS mã hóa DoH. Đảm bảo trạng thái chuyển sang màu xanh."),
        (step: 2, title: "Chọn tính năng Proxy cần dùng", desc: "Bật các tính năng yêu thích (ví dụ: Proxy Body, Proxy Cổ, hoặc Drag Tâm). Không nên bật quá nhiều cùng lúc."),
        (step: 3, title: "Nhấn nút 'MỞ GAME'", desc: "Hệ thống sẽ kiểm tra chữ ký số, nạp hook và tự động kích hoạt game an toàn không bị phát hiện.")
    ]

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                // Video Screen simulation
                ZStack {
                    LinearGradient(colors: [Color.black, DeltaTheme.cardBg], startPoint: .top, endPoint: .bottom)
                    VStack(spacing: 8) {
                        Image(systemName: "iphone.radiowaves.left.and.right")
                            .font(.system(size: 34))
                            .foregroundColor(DeltaTheme.cyan)
                        Text("BƯỚC \(currentStep): \(steps[currentStep - 1].title)")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(DeltaTheme.cyan)
                        Text(steps[currentStep - 1].desc)
                            .font(.system(size: 11))
                            .foregroundColor(DeltaTheme.textSecondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                    }
                }
                .frame(height: 180)
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .overlay(RoundedRectangle(cornerRadius: 16).stroke(DeltaTheme.cardBorder, lineWidth: 1))

                // Steps list
                VStack(spacing: 8) {
                    ForEach(steps, id: \.step) { s in
                        Button {
                            currentStep = s.step
                        } label: {
                            HStack(alignment: .top, spacing: 10) {
                                ZStack {
                                    Circle()
                                        .fill(currentStep == s.step ? DeltaTheme.cyan : DeltaTheme.innerBg)
                                        .frame(width: 24, height: 24)
                                    Text("\(s.step)")
                                        .font(.system(size: 11, weight: .black))
                                        .foregroundColor(currentStep == s.step ? .black : DeltaTheme.textSecondary)
                                }
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(s.title)
                                        .font(.system(size: 12, weight: .bold))
                                        .foregroundColor(.white)
                                    Text(s.desc)
                                        .font(.system(size: 11))
                                        .foregroundColor(DeltaTheme.textSecondary)
                                }
                                Spacer()
                            }
                            .padding(12)
                            .background(currentStep == s.step ? DeltaTheme.cyanDark : DeltaTheme.cardBg)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                            .overlay(RoundedRectangle(cornerRadius: 12).stroke(currentStep == s.step ? DeltaTheme.cyan.opacity(0.5) : DeltaTheme.cardBorder, lineWidth: 1))
                        }
                    }
                }

                Spacer()

                Button {
                    if currentStep < 3 {
                        currentStep += 1
                    } else {
                        dismiss()
                    }
                } label: {
                    Text(currentStep < 3 ? "Bước Tiếp Theo" : "Đã Hiểu, Đóng Hướng Dẫn")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(DeltaTheme.cyan)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .padding(.bottom, 16)
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Hướng Dẫn Cài Đặt")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
        }
    }
}

struct DeltaChangeKeyModal: View {
    var currentKey: String
    var onSave: (String) -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var newKey = ""

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 16) {
                Text("Nhập mã bản quyền Delta VIP:")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(.white)

                TextField("NGPH-XXXX-XXXX-XXXX", text: $newKey)
                    .font(.system(size: 14, weight: .bold, design: .monospaced))
                    .padding(12)
                    .background(DeltaTheme.innerBg)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .overlay(RoundedRectangle(cornerRadius: 12).stroke(DeltaTheme.cyan.opacity(0.5), lineWidth: 1))

                VStack(alignment: .leading, spacing: 4) {
                    Text("• Key hợp lệ sẽ tự động kích hoạt tính năng VIP & V2 không giới hạn.")
                    Text("• Hỗ trợ gia hạn qua kênh Telegram & Admin Delta VN.")
                }
                .font(.system(size: 11))
                .foregroundColor(DeltaTheme.textSecondary)

                Spacer()

                Button {
                    if !newKey.trimmingCharacters(in: .whitespaces).isEmpty {
                        onSave(newKey.trimmingCharacters(in: .whitespaces))
                        dismiss()
                    }
                } label: {
                    Text("Kích Hoạt Key")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(DeltaTheme.cyan)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .padding(.bottom, 16)
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Đổi Mã Bản Quyền Key")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Hủy") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
            .onAppear {
                newKey = currentKey
            }
        }
    }
}

struct DeltaKeyInfoModal: View {
    let keyInfo: DeltaKeyInfo
    let device: DeltaDeviceInfo
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(spacing: 14) {
                VStack(alignment: .leading, spacing: 6) {
                    Text("MÃ KEY ĐẦY ĐỦ")
                        .font(.system(size: 10, weight: .black))
                        .foregroundColor(DeltaTheme.textSecondary)
                    Text(keyInfo.key)
                        .font(.system(size: 14, weight: .bold, design: .monospaced))
                        .foregroundColor(DeltaTheme.cyan)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(14)
                .background(DeltaTheme.cardBg)
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .overlay(RoundedRectangle(cornerRadius: 14).stroke(DeltaTheme.cardBorder, lineWidth: 1))

                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("HẠN DÙNG")
                            .font(.system(size: 10, weight: .black))
                            .foregroundColor(DeltaTheme.textSecondary)
                        Text(keyInfo.expireDate)
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.white)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                    .background(DeltaTheme.cardBg)
                    .clipShape(RoundedRectangle(cornerRadius: 12))

                    VStack(alignment: .leading, spacing: 4) {
                        Text("TRẠNG THÁI")
                            .font(.system(size: 10, weight: .black))
                            .foregroundColor(DeltaTheme.textSecondary)
                        HStack(spacing: 4) {
                            Circle().fill(DeltaTheme.green).frame(width: 6, height: 6)
                            Text("Hoạt Động")
                                .font(.system(size: 13, weight: .bold))
                                .foregroundColor(DeltaTheme.green)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                    .background(DeltaTheme.cardBg)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                }

                HStack {
                    Text("Thiết bị gắn kết:")
                        .font(.system(size: 12))
                        .foregroundColor(DeltaTheme.textSecondary)
                    Spacer()
                    Text("\(device.model) (\(device.osVersion))")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.white)
                }
                .padding(12)
                .background(DeltaTheme.cardBg)
                .clipShape(RoundedRectangle(cornerRadius: 12))

                Spacer()
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Thông Tin Bản Quyền")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
        }
    }
}

struct DeltaColorPickerModal: View {
    let title: String
    let currentColorHex: String
    var onSelect: (String) -> Void
    @Environment(\.dismiss) private var dismiss

    private let colors = [
        ("#00E5FF", "Cyan"),
        ("#EF4444", "Đỏ"),
        ("#22C55E", "Xanh Lá"),
        ("#EAB308", "Vàng"),
        ("#A855F7", "Tím"),
        ("#EC4899", "Hồng"),
        ("#F97316", "Cam"),
        ("#FFFFFF", "Trắng")
    ]

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("Chọn màu hiển thị cho: \(title)")
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(DeltaTheme.textSecondary)

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(colors, id: \.0) { hex, name in
                        Button {
                            onSelect(hex)
                            dismiss()
                        } label: {
                            VStack(spacing: 6) {
                                Circle()
                                    .fill(Color(hex: hex))
                                    .frame(width: 44, height: 44)
                                    .overlay(
                                        Circle().stroke(Color.white, lineWidth: currentColorHex.uppercased() == hex ? 3 : 0)
                                    )
                                    .shadow(color: Color(hex: hex).opacity(0.6), radius: 6)
                                Text(name)
                                    .font(.system(size: 11))
                                    .foregroundColor(.white)
                            }
                        }
                    }
                }
                .padding(.top, 10)

                Spacer()
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Bảng Màu X-Ray")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
        }
    }
}

struct DeltaSkinPreviewModal: View {
    let skin: DeltaModSkin
    var onToggle: (String) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // Visual Hero
                ZStack {
                    LinearGradient(colors: [DeltaTheme.cyanDark, DeltaTheme.innerBg], startPoint: .topLeading, endPoint: .bottomTrailing)
                    VStack(spacing: 12) {
                        Image(systemName: skin.isCrown ? "crown.fill" : "person.fill")
                            .font(.system(size: 54))
                            .foregroundColor(skin.isCrown ? DeltaTheme.amber : DeltaTheme.cyan)
                            .shadow(color: DeltaTheme.cyan.opacity(0.6), radius: 16)
                        Text("\(skin.character) SPECIAL EDITION")
                            .font(.system(size: 11, weight: .bold, design: .monospaced))
                            .foregroundColor(DeltaTheme.cyan)
                    }
                }
                .frame(height: 180)
                .clipShape(RoundedRectangle(cornerRadius: 20))
                .overlay(RoundedRectangle(cornerRadius: 20).stroke(DeltaTheme.cardBorder, lineWidth: 1))

                VStack(alignment: .leading, spacing: 6) {
                    Text(skin.name)
                        .font(.system(size: 18, weight: .black))
                        .foregroundColor(.white)
                    Text("Gói ngoại trang độc quyền cho \(skin.character). Tự động thay thế hoạt ảnh, hiệu ứng vệt sáng và trang phục chiến đấu trong trận.")
                        .font(.system(size: 12))
                        .foregroundColor(DeltaTheme.textSecondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                // Specs
                VStack(spacing: 8) {
                    HStack {
                        Text("Phiên bản:")
                            .foregroundColor(DeltaTheme.textSecondary)
                        Spacer()
                        Text(skin.version)
                            .foregroundColor(.white)
                    }
                    Divider().background(DeltaTheme.cardBorder)
                    HStack {
                        Text("Tương thích:")
                            .foregroundColor(DeltaTheme.textSecondary)
                        Spacer()
                        Text("Mọi máy iOS")
                            .foregroundColor(DeltaTheme.green)
                    }
                    Divider().background(DeltaTheme.cardBorder)
                    HStack {
                        Text("Chống quét:")
                            .foregroundColor(DeltaTheme.textSecondary)
                        Spacer()
                        Text("Đã mã hóa Client-Side")
                            .foregroundColor(DeltaTheme.cyan)
                    }
                }
                .font(.system(size: 12, weight: .semibold))
                .padding(14)
                .background(DeltaTheme.cardBg)
                .clipShape(RoundedRectangle(cornerRadius: 14))

                Spacer()

                Button {
                    onToggle(skin.id)
                    dismiss()
                } label: {
                    Text(skin.isActive ? "HỦY DÙNG NGOẠI TRANG NÀY" : "KÍCH HOẠT NGOẠI TRANG NGAY")
                        .font(.system(size: 13, weight: .black))
                        .foregroundColor(skin.isActive ? .white : .black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(skin.isActive ? Color.red.opacity(0.8) : DeltaTheme.cyan)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                }
                .padding(.bottom, 16)
            }
            .padding(16)
            .background(DeltaTheme.bg.ignoresSafeArea())
            .navigationTitle("Chi Tiết Ngoại Trang")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Đóng") { dismiss() }
                        .foregroundColor(DeltaTheme.cyan)
                }
            }
        }
    }
}

private extension AppSection {
    var titleKey: String {
        switch self {
        case .home: return "tab.home"
        case .new: return "tab.new"
        case .sources: return "tab.sources"
        case .installed: return "tab.installed"
        case .files: return "tab.files"
        case .search: return "tab.search"
        }
    }

    var systemImage: String {
        switch self {
        case .home: return "house.fill"
        case .new: return "clock.fill"
        case .sources: return "shippingbox.fill"
        case .installed: return "tray.full.fill"
        case .files: return "folder.fill"
        case .search: return "magnifyingglass"
        }
    }
}

